import { Message } from "@asmtechno/service-lib";
import { NodeBuildingBlock } from "./nodeBuildingBlock";

export class NodeFlow {
    nodeName!: string;
    startNode!: NodeBuildingBlock;
    repoNodeBuildingBlocks!: NodeBuildingBlock[];
    globalEnv;
}
