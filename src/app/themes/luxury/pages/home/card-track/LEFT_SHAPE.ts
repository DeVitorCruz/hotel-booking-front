import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TAILWIND_LEFT_SHAPE } from "./tailwindCollect/TAILWIND_LEFT_SHAPE";

export const LEFT_SHAPE: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_LEFT_SHAPE,
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