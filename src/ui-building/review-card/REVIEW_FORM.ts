import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexFormField, FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export const REVIEW_FORM: FlexFormItem = {
    fields: [
        {
            id: 0 as number,
            inputItem: {
                value: '' as string,
                placeholder: 'your@email.com' as string,
                customClassName: ['review-email'] as string[],
                label: 'Email' as string,
                isDisabled: false as boolean,
                type: 'email',
                name: 'email' as string,
                required: true as boolean,
            } as FlexInputItem,
            customFieldClassName: '' as string,
            onValueChange: (value: string) => value,
        } as FlexFormField,
        {
            id: 1 as number,
            inputItem: {
                value: '' as string,
                placeholder: 'Write your review...' as string,
                customClassName: ['review-comment'] as string[],
                label: 'Your Review' as string,
                isDisabled: false as boolean,
                type: 'text',
                tagType: 'textarea',
                name: 'comment' as string,
                required: true as boolean,
            } as FlexInputItem,
            customFieldClassName: '' as string,
            onValueChange: (value: string) => value,
        } as FlexFormField,
    ] as FlexFormField[],
    submitButton: {
        id: 0 as number,
        title: 'Post Review' as string,
        type: 'submit',
        customClassName: ['review-submit'] as string[],
        iconType: { type: 'none' } as IconSwitch,
    } as ButtonItem, 
    customClassName: ['review-form'] as string[],
} as FlexFormItem;