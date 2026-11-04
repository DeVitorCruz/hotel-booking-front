import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
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
                    text: 'TRUSTED FROM CLIENTS',
                } as FlexHeadingItem,
                text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus.']
            }
        ]
    },
};