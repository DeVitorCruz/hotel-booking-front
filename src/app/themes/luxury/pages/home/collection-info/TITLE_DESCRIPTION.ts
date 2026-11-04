import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";

export const TITLE_DESCRIPTION: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                heading: {
                    id: 0,
                    headingType: 'h2',
                    text: 'BLOG & ARTICLE',
                } as FlexHeadingItem,
                text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer. Odio facilisis mauris sit amet massa.'],
            } as TextBox,
        ]
    },
};