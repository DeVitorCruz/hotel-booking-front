import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { BANNER_TITLE } from "./BANNER_TITLE";
import { BANNER_BREADCRUMB } from "./BANNER_BREADCRUMB";


export const BANNER_MAIN_CONTAINER: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: ContainerComponent,
    componentInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'banner-main-container-block',
            customElementClassName: 'banner-main-container-element',
            customClassName: [] as string[],
            items: [
                BANNER_TITLE,
                BANNER_BREADCRUMB,
            ] as SequenceSpaceItem[],
        } as ContainerBlock
    },
};