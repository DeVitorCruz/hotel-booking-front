import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { BANNER_LEFT_SMALL_IMAGE } from "./BANNER_LEFT_SMALL_IMAGE";
import { BANNER_MAIN_CONTAINER } from "./BANNER_MAIN_CONTAINER";
import { BANNER_IMAGES_CONTAINER } from "./BANNER_IMAGES_CONTAINER";


export const BANNER_HEADER: ContainerBlock = {
    id: 0,
    customBlockClassName: 'banner-header-block',
    customElementClassName: 'banner-header-element',
    customClassName: [] as string[],
    items: [
        BANNER_LEFT_SMALL_IMAGE,
        BANNER_MAIN_CONTAINER,
        BANNER_IMAGES_CONTAINER,
    ] as SequenceSpaceItem[],
};