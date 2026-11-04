import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";

export const FORM_NAME: FlexFormField = {
    id: 0,
    inputItem: {
        value: '' as string,
        placeholder: 'Your full name' as string,
        customClassName: ['faq-contact-name'] as string[],
        label: 'Name' as string,
        isDisabled: false as boolean,
        type: 'text',
        tagType: 'input',
        name: 'name' as string,
        required: true as boolean,
    } as FlexInputItem,
    customFieldClassName: 'faq-form-name' as string,
    onValueChange: (value: string) => value,
};