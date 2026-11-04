import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const LOGIN_HEADER_TEXT: TextBox[] = [
    {
        id: 0,
        heading: { id: 0, headingType: 'h2', text: 'Welcome Back', } as FlexHeadingItem,
        text: ['Sign in to your account'] as string[],
        customBlockClassName: 'login-header-text',
    }
] as TextBox[];