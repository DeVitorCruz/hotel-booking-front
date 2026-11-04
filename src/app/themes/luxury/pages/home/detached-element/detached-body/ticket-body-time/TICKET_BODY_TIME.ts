import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_TICKET_BODY_TIME } from "./tailwindCollect/TAILWIND_TICKET_BODY_TIME";
import { TICKET } from "./ticket/TICKET";
import { TIME } from "./time/TIME";

export const TICKET_BODY_TIME: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_TICKET_BODY_TIME,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: [
            TICKET as SequenceSpaceItem,
            TIME as SequenceSpaceItem,
        ],
        COSTUME_CLASS_BLOCK_NAME: 'ticket-body-time-block',
        COSTUME_CLASS_ELEMENT: 'ticket-body-time-element',
    },
};