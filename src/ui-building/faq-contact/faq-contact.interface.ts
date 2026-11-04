import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";

export interface HeaderContentItems {
    header: FlexHeadingItem;
    customText?: TextBox[];
};

export interface FaqContactContent {
    headerContent: HeaderContentItems;
    formContent: FlexFormItem;
    successMessage?: string;
};