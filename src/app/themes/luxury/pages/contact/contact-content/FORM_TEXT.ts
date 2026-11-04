import { FlexInputItem } from "@core/models/share-info/flex-input-item.interface";
import { FlexFormField } from "@shared/ui/flex-form/flex-form-item.interface";

export const FORM_TEXT: FlexFormField = {
    id: 2 as number,
    inputItem: {
        value: '' as string,
        placeholder: 'Your message...' as string,
        customClassName: ['contact-message'] as string[],
        label: 'Message' as string,
        isDisabled: false as boolean,
        type:  'text',
        tagType: 'textarea',
        name: 'message' as string,
        required: true as boolean,
    } as FlexInputItem,
    customFieldClassName: '' as string,
    onValueChange: (value: string) => {},
} as FlexFormField;

