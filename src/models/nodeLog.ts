import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeBuildingBlock } from "./nodeBuildingBlock";

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

export class NodeLog extends NodeBuildingBlock {
    constructor(name: string) {
        super(name);
        this.outputConnection = new Array<NodeBuildingBlock>();
    }
    exec(msg: Message) {
        log(`exec::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        const res = new Message('result', {data: [`nodeLog::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }
}

export class NodeLog2 extends NodeBuildingBlock {
    constructor(name: string) {
        super(name);
        this.outputConnection = new Array<NodeBuildingBlock>();
    }
    exec(msg: Message) {
        log(`exec2::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        const res = new Message('result2', {data: [`nodeLog2::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }
}

export class NodeLog3 extends NodeBuildingBlock {
    constructor(name: string) {
        super(name);
        this.outputConnection = new Array<NodeBuildingBlock>();
    }
    exec(msg: Message) {
        log(`exec3::${this.nodeName}::${this.uid}`, LogLevel.debug, msg);
        const res = new Message('result3', {data: [`nodeLog3::${this.nodeName}::${this.uid}`]});
        res.payload.data.push(msg.payload.data.toString());
        return res;
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }
}
