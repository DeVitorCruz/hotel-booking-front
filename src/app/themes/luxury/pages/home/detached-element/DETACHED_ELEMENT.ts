import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_DETACHED_ELEMENT } from "./tailwindCollect/TAILWIND_DETACHED_ELEMENT";
import { DETACHED_LAYER } from "./detached-layer/DETACHED_LAYER";

export const DETACHED_ELEMENT: ContainerBlock = {
    id: 0,
    customBlockClassName: 'detached-element-block',
    customElementClassName: 'detached-element-e',
    customClassName: TAILWIND_DETACHED_ELEMENT,
    items: [
        DETACHED_LAYER as SequenceSpaceItem,
    ],
};