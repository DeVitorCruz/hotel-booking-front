import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TITLE_DESCRIPTION } from "./TITLE_DESCRIPTION";
import { TAILWIND_COLLECTION_INFO } from "./tailwindCollect/TAILWIND_COLLECTION_INFO";
import { CARD_INFO_LIST } from "./CARD_INFO_LIST";

export const COLLECTION_INFO: ContainerBlock = {
    id: 0,
    customBlockClassName: 'collection-info-block',
    customElementClassName: 'collection-info-element',
    customClassName: TAILWIND_COLLECTION_INFO,
    items: [
        TITLE_DESCRIPTION as SequenceSpaceItem,
        CARD_INFO_LIST as SequenceSpaceItem,
    ],
};
