import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_CONTENT_WRAP } from "./tailwindCollect/TAILWIND_CONTENT_WRAP";
import { IMAGE_WRAP } from "./image-wrap/IMAGE_WRAP";
import { TEXT_WRAP } from "./text-wrap/TEXT_WRAP";

export const CONTENT_WRAP: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_CONTENT_WRAP,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            IMAGE_WRAP as SequenceSpaceItem,
            TEXT_WRAP as SequenceSpaceItem,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'content-wrap-block',
        COSTUME_CLASS_ELEMENT: 'content-wrap-element',
    },
};