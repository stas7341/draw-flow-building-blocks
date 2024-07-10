import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeFlow } from "./flow";
import { NodeBuildingBlock, NodeType } from "./nodeBuildingBlock";

export class NodeLog extends NodeBuildingBlock {
    constructor(flow: NodeFlow) {
        super('Log', NodeType.RETURN_VOID, flow);
    }

    async exec(msg: Message) {
        this.log(`node::${this.nodeName}::exec::${this.uid}`, LogLevel.debug, msg);
        await GeneralUtils.waitTimeout(Math.floor(Math.random() * 5) * 1000);
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
        this.log(`node::${this.nodeName}::exec2::${this.uid}`, LogLevel.debug, msg);
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
        this.log(`node::${this.nodeName}::exec3::${this.uid}`, LogLevel.debug, msg);
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
