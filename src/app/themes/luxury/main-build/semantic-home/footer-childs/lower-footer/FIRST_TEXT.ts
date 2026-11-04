import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const FIRST_TEXT: SequenceSpaceItem = {
    id: 0,
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                text: [
                    'Copyright © 2024.'
                ]
            }
        ] as TextBox[],
    }
};