import { Message } from "@asmtechno/service-lib";
import { NodeFlow } from "../models/flow";
import { NodeBuildingBlock } from "../models/nodeBuildingBlock";
import { NodeLog } from "../models/nodeLog";

export interface FlowManagerConfig {
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


    async execFlow(flow: NodeFlow, msg: Message) {
        return flow.exec(msg);
    }
}
