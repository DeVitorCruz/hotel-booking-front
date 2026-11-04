import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { FaqContactContent, HeaderContentItems } from "@ui-building/faq-contact/faq-contact.interface";
import { FAQ_HEADER } from "./FAQ_HEADER";
import { FAQ_FORM } from "./FAQ_FORM";

export const FAQ_CONTACT: FaqContactContent = {
    headerContent: FAQ_HEADER as HeaderContentItems,
    formContent: FAQ_FORM as FlexFormItem,
    successMessage: 'Thank you! We will be in touch shortly.' as string,
};