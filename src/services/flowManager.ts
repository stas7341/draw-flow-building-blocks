import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import {FLOW_EVENTS, INodeFlow, NodeFlow } from "../models/flow";
import { NodeBuildingBlock, NodeType } from "../models/nodeBuildingBlock";
import { NodeLog, NodeLog2, NodeLog3 } from "../models/nodeLog";

export interface FlowManagerConfig {
}

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

export class FlowManagerService {
    private static instance: FlowManagerService;
    private flowsList = new Map<string, INodeFlow>();

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

    createFlow(flowName: string, flowJSON: object): INodeFlow {
        // test only
        const flowExample = new NodeFlow('flow1');
        const node1 = new NodeLog(flowExample);
        flowExample.startNode = node1;
        const node21 = new NodeLog2('node21', NodeType.RETURN_VALUE, flowExample);
        const node22 = new NodeLog2('node22', NodeType.RETURN_VALUE, flowExample);
        node1.addConnection(node21);
        node1.addConnection(node22);
        const node31 = new NodeLog3('node31', NodeType.RETURN_VALUE, flowExample);
        const node32 = new NodeLog3('node32', NodeType.RETURN_VALUE, flowExample);
        const node33 = new NodeLog3('node33', NodeType.RETURN_VALUE, flowExample);
        const node34 = new NodeLog3('node34', NodeType.RETURN_VALUE, flowExample);
        node21.addConnection(node31);
        node22.addConnection(node32);
        node22.addConnection(node33);
        node22.addConnection(node34);

        return flowExample as INodeFlow;
    }

    async execFlow(nodeFlow: INodeFlow, msg: Message) {
        const executionId = GeneralUtils.newGuid();
        const flow = nodeFlow as NodeFlow;
        try {
            this.flowsList.set(executionId, flow);
            await flow.exec(msg, executionId);
            this.flowsList.delete(executionId);
        }
        catch (err: any) {
            log(`flow failed`, LogLevel.error, {executionId, err: err.message});
            this.flowsList.delete(flow.uid);
        }
    }
}
