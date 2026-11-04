import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";

export const RIGHT_SHAPE: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                secFigure: true,
            }
        ] as TextBox[],
    },
};