import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component"; 
import { SEARCH_TEXT_BOX } from "./search-text-box/SEARCH_TEXT_BOX";

export const SEARCH_COLUMN: SequenceSpaceItem = {
    id: 3,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            SEARCH_TEXT_BOX,
        ]
    },
};