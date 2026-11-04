import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_TEXT_WRAP } from "./tailwindCollect/TAILWIND_TEXT_WRAP";
import { SWIPER_SLIDE } from "./swiper-slide/SWIPER_SLIDE";
import { TITLE_DESCRIPTION } from "./TITLE_DESCRIPTION";

export const TEXT_WRAP: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_TEXT_WRAP,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            TITLE_DESCRIPTION as SequenceSpaceItem,
            SWIPER_SLIDE as SequenceSpaceItem,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'text-wrap-block',
        COSTUME_CLASS_ELEMENT: 'text-wrap-element',
    },
};