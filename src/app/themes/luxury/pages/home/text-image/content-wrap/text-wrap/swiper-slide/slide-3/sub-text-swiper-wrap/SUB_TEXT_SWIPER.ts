import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_SUB_TEXT_SWIPER } from "./tailwindCollect/TAILWIND_SUB_TEXT_SWIPER";
import { TITLE } from "./TITLE";
import { SUB_TEXT } from "./SUB_TEXT";

export const SUB_TEXT_SWIPER: SequenceSpaceItem = {
    id: 2,  
    customClassName: TAILWIND_SUB_TEXT_SWIPER,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            TITLE,
            SUB_TEXT
        ],
        COSTUME_CLASS_ELEMENT: 'sub-text-swiper-block',
        COSTUME_CLASS_BLOCK_NAME: 'sub_text-swiper-element',
        COSTUME_CLASS_NAME_LIST: [], 
    },
};