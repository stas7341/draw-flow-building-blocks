import EventEmitter from "node:events";
import {GeneralUtils, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeFlow } from "./flow";

export enum NodeType {
    START_FLOW,
    CONDITION,
    RETURN_VALUE,
    RETURN_VOID,
    END_FLOW,
    UNDEFINED
}

export abstract class NodeBuildingBlock extends EventEmitter{
    readonly nodeName: string;
    readonly uid: string;
    readonly nodeFlow: NodeFlow;
    readonly nodeType: NodeType;
    protected outputConnection!: NodeBuildingBlock[];
    abstract exec(msg: Message);
    abstract outputResolver(msg: Message): NodeBuildingBlock[];
    abstract addConnection(node: NodeBuildingBlock);
    constructor(name: string, type: NodeType, flow: NodeFlow) {
        super();
        this.nodeName = name;
        this.nodeFlow = flow;
        this.nodeType = type;
        this.uid = GeneralUtils.newGuid();
        this.outputConnection = new Array<NodeBuildingBlock>();
        if(!flow)
            throw new Error(`flow object is mandatory`);
        if(type === NodeType.UNDEFINED)
            throw new Error(`node type is mandatory`);
        flow.setNode(this);
    }

    protected log(msg: string, level: LogLevel = LogLevel.info, metadata?: any) {
        this.emit('LOG', msg, level, metadata);
    }
}
