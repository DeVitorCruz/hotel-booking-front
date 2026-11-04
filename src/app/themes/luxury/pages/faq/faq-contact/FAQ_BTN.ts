import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export const FAQ_BTN: ButtonItem = {
    id: 0,
    title: 'Submit Now' as string,
    type: 'submit',
    customClassName: ['faq-contact-submit'] as string[],
    iconType: { type: 'none' } as IconSwitch,
};