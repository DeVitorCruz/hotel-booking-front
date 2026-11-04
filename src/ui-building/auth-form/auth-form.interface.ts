import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export interface AuthFormContent {
    headerContent: ContainerBlock;
    formContent: FlexFormItem;
    footerContent?: TextBox[];
};