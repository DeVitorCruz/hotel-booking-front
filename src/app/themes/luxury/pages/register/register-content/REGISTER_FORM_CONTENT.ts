import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexFormField, FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { SIGN_UP_BUTTON } from "./SIGN_UP_BUTTON";
import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";


export const REGISTER_FORM_CONTENT: FlexFormItem = {
    fields: [
        {
            id: 0,
            inputItem: {
                value: '',
                placeholder: 'Your full name',
                customClassName: ['flex-email-field'] as string[],
                label: 'Full Name',
                isDisabled: false,
                type: 'text',
                name: 'name',
                required: true,
            } as FlexInputItem,
            customFieldClassName: '',
            onValueChange: (value: string) => value 
        } as FlexFormField,
        {
            id: 1,
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
            id: 2,
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
        {
            id: 3,
            inputItem: {
                value: '',
                placeholder: '••••••••',
                customClassName: ['flex-confirm-password-field'] as string[],
                label: 'Confirm Password',
                isDisabled: false,
                type: 'password',
                name: 'password_confirmation',
                required: true,
            } as FlexInputItem,
            customFieldClassName: '',
            onValueChange: (value: string) => value 
        } as FlexFormField,
    ] as FlexFormField[],
    submitButton: SIGN_UP_BUTTON as ButtonItem, 
    customClassName: ['register-form-content'] as string[],
} as FlexFormItem;