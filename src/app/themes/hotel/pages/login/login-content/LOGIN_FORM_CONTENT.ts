import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexFormField, FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { SUBMIT_BUTTON } from "./SUBMIT_BUTTON";
import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";

export const LOGIN_FORM_CONTENT: FlexFormItem = {
        fields: [
            {
                id: 0,
                inputItem: {
                    value: '',
                    placeholder: 'your@email.com',
                    customClassName: ['flex-email-field'] as string[],
                    label: 'Email',
                    isDisabled: false,
                    type: 'email',
                    name: 'email',
                    required: true,
                } as FlexInputItem,
                customFieldClassName: '',
                onValueChange: (value: string) => value 
            } as FlexFormField,
            {
                id: 1,
                inputItem: {
                    value: '',
                    placeholder: '••••••••',
                    customClassName: ['flex-password-field'] as string[],
                    label: 'Password',
                    isDisabled: false,
                    type: 'password',
                    name: 'password',
                    required: true,
                } as FlexInputItem,
                customFieldClassName: '',
                onValueChange: (value: string) => value 
            } as FlexFormField,
        ] as FlexFormField[],
        submitButton: SUBMIT_BUTTON as ButtonItem, 
        customClassName: ['login-form-content'] as string[],
} as FlexFormItem;