import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { HEADER_LOGO } from "./HEADER_LOGO";
import { HEADER_AUTH_ACTION } from "./HEADER_AUTH_ACTION";

export const LEFT_HEADER: SequenceSpaceItem = {
    id: 0,  
    customClassName: [] as string[],
    component: ContainerComponent,
    componentInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'left-header-block',
            customElementClassName: 'left-header-element',
            customClassName: [] as string[],
            items: [
                HEADER_LOGO,
                HEADER_AUTH_ACTION
            ] as SequenceSpaceItem[],
        } as ContainerBlock,
    },
} as SequenceSpaceItem;