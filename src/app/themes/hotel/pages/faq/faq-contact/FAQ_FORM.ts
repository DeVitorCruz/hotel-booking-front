import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexFormField, FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { FORM_NAME } from "./FORM_NAME";
import { FORM_EMAIL } from "./FORM_EMAIL";
import { FORM_TEXT } from "./FORM_TEXT";
import { FAQ_BTN } from "./FAQ_BTN";

export const FAQ_FORM: FlexFormItem = {
    fields: [
        FORM_NAME as FlexFormField,
        FORM_EMAIL as FlexFormField,
        FORM_TEXT as FlexFormField,
    ] as FlexFormField[],
    submitButton: FAQ_BTN as ButtonItem, 
    customClassName: ['faq-form'] as string[],
};