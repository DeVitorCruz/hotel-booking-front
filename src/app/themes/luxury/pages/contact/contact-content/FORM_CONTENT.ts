import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexFormField, FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { FORM_NAME } from "./FORM_NAME";
import { FORM_EMAIL } from "./FORM_EMAIL";
import { FORM_TEXT } from "./FORM_TEXT";

export const FORM_CONTENT: FlexFormItem = {
    fields: [
        FORM_NAME,
        FORM_EMAIL,
        FORM_TEXT,
    ] as FlexFormField[],
    submitButton: {
        id: 0 as number,
        title: 'Send Message' as string,
        type: 'submit',
        customClassName: ['contact-submit'] as string[],
        iconType: { type: 'none', } as IconSwitch,
    } as ButtonItem, 
    customClassName: ['contact-form'] as string[],
} as FlexFormItem; 