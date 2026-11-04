import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_DETACHED_LAYER } from "./tailwindCollect/TAILWIND_DETACHED_LAYER";
import { DETACHED_IMAGE } from "../DETACHED_IMAGE";
import { DETACHED_BODY } from "../detached-body/DETACHED_BODY";

export const DETACHED_LAYER: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_DETACHED_LAYER,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            DETACHED_IMAGE as SequenceSpaceItem,
            DETACHED_BODY as SequenceSpaceItem,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'detached-layer-block',
        COSTUME_CLASS_ELEMENT: 'detached-layer-element',
    },
};