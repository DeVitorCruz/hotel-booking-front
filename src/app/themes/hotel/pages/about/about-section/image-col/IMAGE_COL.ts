import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { MAIN_IMAGE } from "./MAIN_IMAGE";
import { SECONDARY_IMAGE } from "./SECONDARY_IMAGE";
import { CENTER_ICON } from "./CENTER_ICON";

export const IMAGE_COL: SequenceSpaceItem = {
    id: 0,  
    customClassName: [] as string[],
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            MAIN_IMAGE,
            CENTER_ICON,
            SECONDARY_IMAGE,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'about-image-col-block',
        COSTUME_CLASS_ELEMENT: 'about-image-col-element',
        COSTUME_CLASS_NAME_LIST: [],
    },
};