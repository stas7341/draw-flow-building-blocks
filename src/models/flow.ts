import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeBuildingBlock } from "./nodeBuildingBlock";

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

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

export class NodeFlow {
    readonly flowName!: string;
    readonly uid: string;
    startNode!: NodeBuildingBlock;
    repoNodeBuildingBlocks = new Map<string, NodeBuildingBlock>();
    globalEnv = new Map<string, any>();
    constructor(name) {
        this.flowName = name;
        this.uid = GeneralUtils.newGuid();
    }

    async exec(msg: Message) {
        log(`exec::${this.flowName}::${this.uid}`, LogLevel.debug, msg);
        const generator = flowEngine.inOrderTraversal(this.startNode, msg);
        let result = await generator.next(msg);
        console.log(result.value)
        while (result.done === false) {
            result = await generator.next(result.value);
            console.log(result.value)
        }
    };
}
