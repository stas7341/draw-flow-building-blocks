import { Message } from "@asmtechno/service-lib";

export abstract class NodeBuildingBlock {
    nodeName!: string;
    uid!: string;
    outputConnection!: NodeBuildingBlock[];
    abstract exec(msg: Message);
    abstract addConnection(node: NodeBuildingBlock);
}
