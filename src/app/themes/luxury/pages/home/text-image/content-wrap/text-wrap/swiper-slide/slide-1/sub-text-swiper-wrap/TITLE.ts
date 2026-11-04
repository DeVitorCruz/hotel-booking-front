import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { FlexHeadingComponent } from "@shared/ui/flex-heading/flex-heading.component";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";

export const TITLE: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: FlexHeadingComponent,
    componentInput: {
        FLEX_HEADING: {
            id: 0,
            headingType: 'h2',
            text: 'Jennifer Lofez',
        } as FlexHeadingItem,
    },
};