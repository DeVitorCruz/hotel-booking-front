import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { BANNER_DECO_IMAGE_LEFT } from "./BANNER_DECO_IMAGE_LEFT";
import { BANNER_BG_IMAGE } from "./BANNER_BG_IMAGE";
import { BANNER_DECO_IMAGE_RIGHT } from "./BANNER_DECO_IMAGE_RIGHT";


export const BANNER_IMAGES_CONTAINER: SequenceSpaceItem = {
    id: 2,  
    customClassName: [] as string[],
    component: ContainerComponent,
    componentInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'banner-images-block',
            customElementClassName: 'banner-images-element',
            customClassName: [] as string[],
            items: [
                BANNER_DECO_IMAGE_LEFT,
                BANNER_BG_IMAGE,
                BANNER_DECO_IMAGE_RIGHT,
            ] as SequenceSpaceItem[],
        } as ContainerBlock
    },
};