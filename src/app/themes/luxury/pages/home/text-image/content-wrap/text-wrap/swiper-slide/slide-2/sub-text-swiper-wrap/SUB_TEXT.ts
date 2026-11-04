import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const SUB_TEXT: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                text: ['Vary Happy Customer'],
                customBlockClassName: 'sub-text',
            } as TextBox,
        ],
    },
};