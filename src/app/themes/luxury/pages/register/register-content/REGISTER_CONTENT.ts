import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { AuthFormContent } from "@ui-building/auth-form/auth-form.interface";
import { REGISTER_HEADER_CONTENT } from "./REGISTER_HEADER_CONTENT";
import { REGISTER_FOOTER_CONTENT } from "./REGISTER_FOOTER_CONTENT";
import { REGISTER_FORM_CONTENT } from "./REGISTER_FORM_CONTENT";

export const REGISTER_CONTENT: AuthFormContent = {
    headerContent: REGISTER_HEADER_CONTENT as ContainerBlock,
    formContent: REGISTER_FORM_CONTENT as FlexFormItem,
    footerContent: REGISTER_FOOTER_CONTENT as TextBox[],
};