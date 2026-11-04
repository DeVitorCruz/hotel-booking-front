import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const HEADER: TextBox[] = [
    {
        id: 0 as number,
        heading: {
            id: 0 as number,
            headingType: 'h2',
            text: 'Get In Touch' as string,
        } as FlexHeadingItem,
        text: ['We would love to hear from you. Visit us or send a message.'] as string[],
    } as TextBox,
];
