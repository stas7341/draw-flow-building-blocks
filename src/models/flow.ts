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
    getAllNode();
    on(event: FLOW_EVENTS, listener: Function): this;
}

export class NodeFlow extends EventEmitter implements INodeFlow {
    readonly flowName!: string;
    readonly uid: string;
    startNode!: NodeBuildingBlock;
    private listNodes = new Map<string, NodeBuildingBlock>();
    globalEnv = new Map<string, any>();
    constructor(name) {
        super();
        this.flowName = name;
        this.uid = GeneralUtils.newGuid();
    }
    private log(msg: string, level: LogLevel = LogLevel.info, metadata?: any) {
        this.emit(FLOW_EVENTS.LOG, msg, level, metadata);
    }

    setNode(node: NodeBuildingBlock) {
        this.listNodes.set(node.uid, node);
        node.on(FLOW_EVENTS.LOG, (...args: any[]) => {
            const [message, logLevel, metadata] = args;
            this.emit(FLOW_EVENTS.LOG, message, logLevel, metadata);
        });
    }

    getAllNode() {
        return this.listNodes;
    }

    async exec(msg: Message, executionId: string) {
        this.emit(FLOW_EVENTS.STARTED, `flow::${this.flowName}`, LogLevel.info, {uid: this.uid, executionId});
        msg.payload.executionId = executionId;
        const generator = flowEngine.inOrderTraversal(this.startNode, msg);
        let result = await generator.next(msg);
        while (result.done === false) {
            const inputMsg = Message.clone(result.value);
            inputMsg.payload.executionId = executionId;
            this.emit(FLOW_EVENTS.NODE_MOVED, `flow::${this.flowName}`, LogLevel.debug, {uid: this.uid, executionId, result: result.value});
            result = await generator.next(inputMsg);
        }
        this.emit(FLOW_EVENTS.ENDED, `flow::${this.flowName}`, LogLevel.info, {uid: this.uid, executionId});
    };
}
