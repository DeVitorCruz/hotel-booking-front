import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export const SIGN_UP_BUTTON: ButtonItem = {
    id: 0,
    title: 'Sign Up',
    type: 'submit',
    customClassName: ['auth-sign-up-btn'] as string[],
    iconType: { type: 'none'} as IconSwitch,
} as ButtonItem;