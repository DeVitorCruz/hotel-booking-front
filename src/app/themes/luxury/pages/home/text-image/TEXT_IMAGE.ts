import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { CONTENT_WRAP } from "./content-wrap/CONTENT_WRAP";
import { TAILWIND_TEXT_IMAGE } from "./tailwindCollect/TAILWIND_TEXT_IMAGE";

export const TEXT_IMAGE: ContainerBlock = {
    id: 0,
    customBlockClassName: 'text-image-block',
    customElementClassName: 'text-image-e',
    customClassName: TAILWIND_TEXT_IMAGE,
    items: [
        CONTENT_WRAP as SequenceSpaceItem,
    ],
};