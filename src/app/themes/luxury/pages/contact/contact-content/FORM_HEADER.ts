import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const FORM_HEADER: TextBox[] = [
    {
        id: 0 as number,
        heading: {
            id: 0 as number,
            headingType:  'h2',
            text: 'Send Us a Message' as string,
        } as FlexHeadingItem,
    } as TextBox,
];