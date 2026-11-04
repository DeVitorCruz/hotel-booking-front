import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TAILWIND_BOTTOM_TEXT_BOX } from "./tailwindCollect/TAILWIND_BOTTOM_TEXT_BOX";

export const BOTTOM_TEXT_BOX: SequenceSpaceItem = {
    id: 1,  
    customClassName: TAILWIND_BOTTOM_TEXT_BOX,
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                heading: {
                    id: 0,
                    headingType: 'h2',
                    text: 'Subtotal',
                } as FlexHeadingItem,
                text: ['$215.14'],
                customBlockClassName: 'bottom-text-box-block',
            } as TextBox
        ],
    },
};
