import {GeneralUtils, Message } from "@asmtechno/service-lib";

export abstract class NodeBuildingBlock {
    nodeName!: string;
    uid!: string;
    outputConnection!: NodeBuildingBlock[];
    abstract exec(msg: Message);
    abstract addConnection(node: NodeBuildingBlock);
    constructor(name: string) {
        this.nodeName = name;
        this.uid = GeneralUtils.newGuid();
    }
}
