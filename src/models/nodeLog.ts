import {GeneralUtils, Logger, LogLevel, Message } from "@asmtechno/service-lib";
import { NodeBuildingBlock } from "./nodeBuildingBlock";

const log = (msg: string, level: LogLevel = LogLevel.info, metadata:any = undefined) =>
    Logger.getInstance().log(msg, level, metadata);

export class NodeLog extends NodeBuildingBlock{
    constructor() {
        super();
        this.nodeName = 'log';
        this.uid = GeneralUtils.newGuid();
        this.outputConnection = new Array<NodeBuildingBlock>();
    }
    exec(msg: Message) {
        log(`exec::${this.uid}`, LogLevel.debug, msg); 
        return `hello from nodeLog::${this.uid}`
    };

    addConnection(node: NodeBuildingBlock) {
        this.outputConnection.push(node);
    }
}
