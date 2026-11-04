import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const BLOG_HEADER: TextBox[] = [
    {
        id: 0 as number,
        heading: {
            id: 0 as number,
            headingType:  'h2',
            text: 'Our Blog' as string,
        } as FlexHeadingItem,
        text: ['News, stories and ideas from our team.'] as string[],
    } as TextBox,
] as TextBox[];