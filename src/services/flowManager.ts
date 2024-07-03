import { Message } from "@asmtechno/service-lib";
import { NodeFlow } from "../models/flow";
import { NodeBuildingBlock } from "../models/nodeBuildingBlock";
import { NodeLog } from "../models/nodeLog";

export interface FlowManagerConfig {
}

namespace flowEngine {
    export function* inOrderTraversal(node: NodeBuildingBlock, msg) {
        if (!node) return;

        const res = yield node.exec(msg);
        for (const output of node.outputConnection) {
            yield* inOrderTraversal(output, res);
        }
    }
}

export class FlowManagerService {
    private static instance: FlowManagerService;
    private repoNodeBuldingBlock = new Map<string, NodeBuildingBlock>();

    protected constructor() {
        FlowManagerService.instance = this;
    }

    static getInstance(): FlowManagerService {
        if (!this.instance)
            this.instance = new FlowManagerService();
        return this.instance;
    }

    async init(config: FlowManagerConfig): Promise<boolean> {
        return true;
    }

    registerNodeBuildingBlock(node: NodeBuildingBlock) {
        this.repoNodeBuldingBlock.set(node.nodeName, node);
    }


    execFlow(flow: NodeFlow, msg: Message) {
        const generator = flowEngine.inOrderTraversal(flow.startNode, msg);
        let result = generator.next(msg);
        console.log(result.value)
        while (result.done === false) {
            result = generator.next(result.value);
            console.log(result.value)
        }
    }
}
