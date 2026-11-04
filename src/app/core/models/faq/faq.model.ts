export interface FaqItem {
    id: number;
    question: string;
    answer: string;
    category?: string;
    order: number;
    active: boolean;
};