import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export const SUBMIT_BUTTON: ButtonItem = {
    id: 0,
    title: 'Sign In',
    type: 'submit',
    customClassName: ['auth-sugmit-btn'] as string[],
    iconType: { type: 'none'} as IconSwitch,
} as ButtonItem;