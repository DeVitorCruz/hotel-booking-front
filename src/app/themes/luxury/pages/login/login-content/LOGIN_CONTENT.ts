import { AuthFormContent } from "@ui-building/auth-form/auth-form.interface";
import { LOGIN_HEADER_CONTENT } from "./LOGIN_HEADER_CONTENT";
import { LOGIN_FOOTER_CONTENT } from "./LOGIN_FOOTER_CONTENT";
import { LOGIN_FORM_CONTENT } from "./LOGIN_FORM_CONTENT";
import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export const LOGIN_CONTENT: AuthFormContent = {
    headerContent: LOGIN_HEADER_CONTENT as ContainerBlock,
    formContent: LOGIN_FORM_CONTENT as FlexFormItem,
    footerContent: LOGIN_FOOTER_CONTENT as TextBox[],
};