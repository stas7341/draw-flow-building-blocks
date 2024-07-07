import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeFlow } from "./flow";
import { NodeBuildingBlock, NodeType } from "./nodeBuildingBlock";

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

export class NodeLog extends NodeBuildingBlock {
    constructor(name: string, type: NodeType, flow: NodeFlow) {
        super(name, type, flow);
    }
    async exec(msg: Message) {
        log(`exec::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        await GeneralUtils.waitTimeout(20);
        const res = new Message('result', {data: [`nodeLog::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }

    outputResolver(msg: Message): NodeBuildingBlock[] {
        return this.outputConnection;
    }
}

export class NodeLog2 extends NodeBuildingBlock {
    async exec(msg: Message) {
        log(`exec2::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        await GeneralUtils.waitTimeout(5);
        const res = new Message('result2', {data: [`nodeLog2::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }

    outputResolver(msg: Message): NodeBuildingBlock[] {
        return this.outputConnection;
    }
}

export class NodeLog3 extends NodeBuildingBlock {
    async exec(msg: Message) {
        log(`exec3::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        await GeneralUtils.waitTimeout(10);
        const res = new Message('result3', {data: [`nodeLog3::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }

    outputResolver(msg: Message): NodeBuildingBlock[] {
        return this.outputConnection;
    }
}
