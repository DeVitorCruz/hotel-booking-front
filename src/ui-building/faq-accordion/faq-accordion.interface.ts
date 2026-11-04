import { TextBox } from "@shared/ui/text-box/text-box-item.interface";

export interface FaqAccordionItem {
    id: number;
    question: string;
    answer: string;
    code: string;
};

export interface FaqAccordionContent {
    header: TextBox[];
    items: FaqAccordionItem[];
};