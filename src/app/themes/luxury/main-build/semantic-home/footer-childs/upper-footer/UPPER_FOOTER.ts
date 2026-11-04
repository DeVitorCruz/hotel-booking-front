import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { COLUMNS } from "./columns/COLUMNS";
import { TAILWIND_UPPER_FOOTER } from "./tailwindCollect/TAILWIND_UPPER_FOOTER";

export const UPPER_FOOTER: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_UPPER_FOOTER,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: COLUMNS,
        COSTUME_CLASS_BLOCK_NAME: 'upper-footer',
        COSTUME_CLASS_ELEMENT: 'upper-footer-element',
    },
};