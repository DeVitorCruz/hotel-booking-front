import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_BODY } from "./tailwindCollect/TAILWIND_BODY";
import { TEXT_BODY } from "./text-body/TEXT_BODY";
import { TICKET_BODY_TIME } from "./ticket-body-time/TICKET_BODY_TIME";

export const DETACHED_BODY: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_BODY,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            TEXT_BODY as SequenceSpaceItem,
            TICKET_BODY_TIME as SequenceSpaceItem,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'detached-body-block',
        COSTUME_CLASS_ELEMENT: 'detached-body-element',
    },
};