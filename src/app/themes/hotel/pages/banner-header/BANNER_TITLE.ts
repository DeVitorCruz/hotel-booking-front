import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { TextBoxComponent } from "@shared/ui/text-box/text-box.component";


export const BANNER_TITLE: SequenceSpaceItem = {
    id: 0,  
    customClassName: [] as string[],
    component: TextBoxComponent,
    componentInput: {
        TEXT_BOX_LIST: [
            {
                id: 0,
                heading: { id: 0, headingType: 'h2', text: 'Page title', } as FlexHeadingItem,
                customBlockClassName: 'banner-title',
            } as TextBox,
        ] as TextBox[],
    },
};