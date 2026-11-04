import { FlexInputItem } from "../../../core/models/share-info/flex-input-item.interface";
import { ButtonItem } from "../button/button-item.interface";

export interface FlexFormField {
    id: number;
    inputItem: FlexInputItem;
    customFieldClassName?: string;
    onValueChange?: (value: string) => void;
}

export interface FlexFormItem {
    fields: FlexFormField[];
    submitButton: ButtonItem; 
    customClassName?: string[];
};