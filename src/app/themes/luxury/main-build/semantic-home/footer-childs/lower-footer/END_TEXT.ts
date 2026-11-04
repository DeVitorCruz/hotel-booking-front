import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const END_TEXT: SequenceSpaceItem = {
    id: 2,
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                text: [
                    'All Rights Reserved.'
                ]
            }
        ] as TextBox[],
    }
};