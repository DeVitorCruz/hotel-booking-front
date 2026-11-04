import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { ICON_VALUE } from "./ICON_VALUE";
import { SQUARE_SWIPER } from "./SQUARE_SWIPER";

export const ICON_SWIPER_WRAP: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            ICON_VALUE,
            SQUARE_SWIPER
        ],
        COSTUME_CLASS_BLOCK_NAME: 'icon-swiper-wrap-block',
        COSTUME_CLASS_ELEMENT: 'icon-swiper-wrap-element',
        COSTUME_CLASS_NAME_LIST: []
    },
};