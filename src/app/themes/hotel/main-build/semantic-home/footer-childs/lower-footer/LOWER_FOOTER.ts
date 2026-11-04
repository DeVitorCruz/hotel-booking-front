import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { FIRST_TEXT } from "./FIRST_TEXT";
import { MIDDLE_TEXT } from "./MIDDLE_TEXT";
import { END_TEXT } from "./END_TEXT";
import { TAILWIND_LOWER_FOOTER } from "./tailwindCollect/TAILWIND_LOWER_FOOTER";

export const LOWER_FOOTER: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_LOWER_FOOTER,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            FIRST_TEXT,
            MIDDLE_TEXT,
            END_TEXT,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'lower-footer',
    },
};