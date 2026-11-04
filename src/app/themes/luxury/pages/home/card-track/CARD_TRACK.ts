import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_CARD_TRACK } from "./tailwindCollect/TAILWIND_CARD_TRACK";
import { LEFT_SHAPE } from "./LEFT_SHAPE";
import { RIGHT_SHAPE } from "./RIGHT_SHAPE";
import { CONTENT_COLLECTION_TRACK } from "./CONTENT_COLLECTION_TRACK";

export const CARD_TRACK: ContainerBlock = {
    id: 0,
    customBlockClassName: 'card-track-block',
    customElementClassName: 'card-track-element',
    customClassName: TAILWIND_CARD_TRACK,
    items: [
        LEFT_SHAPE as SequenceSpaceItem,
        RIGHT_SHAPE as SequenceSpaceItem,
        CONTENT_COLLECTION_TRACK as SequenceSpaceItem,
    ],
}; 