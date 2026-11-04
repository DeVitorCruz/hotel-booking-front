import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const REGISTER_HEADER_TEXT: TextBox[] = [
    {
        id: 0,
        heading: { id: 0, headingType: 'h2', text: 'Signup', } as FlexHeadingItem,
        text: ['Sign in to your pages account'] as string[],
        customBlockClassName: 'register-header-text',
    }
] as TextBox[];