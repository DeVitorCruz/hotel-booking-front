import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";

export const FORM_EMAIL: FlexFormField = {
    id: 1,
    inputItem: {
        value: '' as string,
        placeholder: 'your@email.com' as string,
        customClassName: ['faq-contact-email'] as string[],
        label: 'Email' as string,
        isDisabled: false as boolean,
        type: 'email',
        name: 'email' as string,
        required: true as boolean,
    } as FlexInputItem,
    customFieldClassName: 'faq-form-email' as string,
    onValueChange: (value: string) => value,
};