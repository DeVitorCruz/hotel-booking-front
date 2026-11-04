import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { HeaderContentItems } from "@ui-building/faq-contact/faq-contact.interface";
import { HEADER_ITEM } from "./HEADER_ITEM";
import { HEADER_TEXT } from "./HEADER_TEXT";

export const FAQ_HEADER: HeaderContentItems = {
    header: HEADER_ITEM as FlexHeadingItem,
    customText: [
        HEADER_TEXT as TextBox
    ] as TextBox[],
} as HeaderContentItems;