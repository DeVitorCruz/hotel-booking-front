import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TAILWIND_RIGHT_SHAPE } from "./tailwindCollect/TAILWIND_RIGHT_SHAPE";

export const RIGHT_SHAPE: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_RIGHT_SHAPE,
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                secFigure: true,
            } as TextBox
        ]
    },
};
