import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { CARD_1 } from "./CARD_1";
import { CARD_2 } from "./CARD_2";
import { CARD_3 } from "./CARD_3";

export const CARD_INFO_LIST: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: ContainerComponent,
    componentInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'card-info-list-block',
            customElementClassName: 'card-info-list-element',
            customClassName: [],
            items: [
                CARD_1,
                CARD_2,
                CARD_3
            ],
        },
    },
};