import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeBuildingBlock } from "./nodeBuildingBlock";
import EventEmitter from "node:events";

export enum FLOW_EVENTS {
    LOG = 'LOG',
    STARTED = 'STARTED',
    NODE_MOVED = 'NODE_MOVED',
    ERROR = 'ERROR',
    ENDED = 'ENDED'
}

namespace flowEngine {
    export async function* inOrderTraversal(node: NodeBuildingBlock, msg) {
        if (!node) return;

        const res = yield await node.exec(msg);
        const outputConn = node.outputResolver(res);
        for (const output of outputConn) {
            yield* inOrderTraversal(output, res);
        }
    }
}

export interface INodeFlow {
    readonly flowName: string;
    readonly uid: string;
    startNode: NodeBuildingBlock;
    exec(msg: Message, executionId: string);
    globalEnv: Map<string, any>;
    repoNodeBuildingBlocks: Map<string, NodeBuildingBlock>;
    on(event: FLOW_EVENTS, listener: Function): this;
}

export class NodeFlow extends EventEmitter implements INodeFlow {
    readonly flowName!: string;
    readonly uid: string;
    startNode!: NodeBuildingBlock;
    repoNodeBuildingBlocks = new Map<string, NodeBuildingBlock>();
    globalEnv = new Map<string, any>();
    constructor(name) {
        super();
        this.flowName = name;
        this.uid = GeneralUtils.newGuid();
    }
    private log(msg: string, level: LogLevel = LogLevel.info, metadata?: any) {
        this.emit(FLOW_EVENTS.LOG, msg, level, metadata);
    }

    async exec(msg: Message, executionId: string) {
        this.emit(FLOW_EVENTS.STARTED, `${this.flowName}::${this.uid}`, LogLevel.info, {uid: this.uid, executionId});
        msg.payload.executionId = executionId;
        const generator = flowEngine.inOrderTraversal(this.startNode, msg);
        let result = await generator.next(msg);
        while (result.done === false) {
            const inputMsg = Message.clone(result.value);
            inputMsg.payload.executionId = executionId;
            this.emit(FLOW_EVENTS.NODE_MOVED, result.value, LogLevel.debug, {uid: this.uid, executionId});
            result = await generator.next(inputMsg);
        }
        this.emit(FLOW_EVENTS.ENDED, result.value || '', LogLevel.info, {uid: this.uid, executionId});
    };
}
