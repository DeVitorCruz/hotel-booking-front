import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { IMAGE_COL } from "./image-col/IMAGE_COL";
import { TEXT_COL } from "./text-col/TEXT_COL";

export const ABOUT_SECTION: ContainerBlock = {
    id: 0,
    customBlockClassName: 'about-section-block',
    customElementClassName: 'about-section-element',
    customClassName: [] as string[],
    items: [
        IMAGE_COL,
        TEXT_COL,
    ] as SequenceSpaceItem[],
};