import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FaqAccordionContent, FaqAccordionItem } from "@ui-building/faq-accordion/faq-accordion.interface";
import { HEADER } from "./HEADER";
import { ACCORDION_ITEM } from "./ACCORDION_ITEM";

export const FAQ_LIST_CONTENT: FaqAccordionContent = {
    header: HEADER as TextBox[],
    items: ACCORDION_ITEM as FaqAccordionItem[],
};