import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";

export const FORM_EMAIL: FlexFormField = {
    id: 1 as number,
    inputItem: {
        value: '' as string,
        placeholder: 'your@email.com' as string,
        customClassName: ['contact-email'] as string[],
        label: 'Email' as string,
        isDisabled: false as boolean,
        type:  'email',
        name: 'email' as string,
        required: true as boolean,
    } as FlexInputItem,
    customFieldClassName: '' as string,
    onValueChange: (value: string) => {},
} as FlexFormField;
