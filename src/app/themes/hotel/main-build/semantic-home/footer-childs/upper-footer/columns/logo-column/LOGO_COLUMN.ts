import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { HEADER_LOGO_COLUMN } from "./header-logo-column/HEADER_LOGO_COLUMN";
import { BODY_LOGO_COLUMN } from "./body-logo-column/BODY_LOGO_COLUMN";

export const LOGO_COLUMN: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            HEADER_LOGO_COLUMN,
            BODY_LOGO_COLUMN,
        ] as SequenceSpaceItem[],
        COSTUME_CLASS_BLOCK_NAME: 'logo-column',
    },
};