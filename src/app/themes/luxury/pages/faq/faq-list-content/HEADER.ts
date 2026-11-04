import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const HEADER: TextBox[] = [
    {
        id: 0,
        heading: {
            id: 0,
            headingType: 'h2',
            text: 'Frequently Asked Question'.toUpperCase(),
        } as FlexHeadingItem,
        customBlockClassName: 'faq-list-content-header',
    } as TextBox,
] as TextBox[];