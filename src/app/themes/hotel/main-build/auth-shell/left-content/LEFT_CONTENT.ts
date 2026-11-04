import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { LEFT_HEADER } from "./LEFT_HEADER";
import { LEFT_MAIN } from "./LEFT_MAIN";
import { LEFT_FOOTER } from "./LEFT_FOOTER";


export const LEFT_CONTENT: ContainerBlock =  {
    id: 0,
    customBlockClassName: 'left-content-block',
    customElementClassName: 'left-content-element',
    customClassName: [] as string[],
    items: [
        LEFT_HEADER,
        LEFT_MAIN,
        LEFT_FOOTER,
    ] as SequenceSpaceItem[],
} as ContainerBlock;