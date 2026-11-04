import { MediaImg } from "@core/models/media/media-img.interface";

export interface ProductListAction {
    id: number;
    label: string;
    customClassName?: string[];
    handler: (itemId: number) => void;
};

export interface ProductListItem {
    id: number;
    image: MediaImg;
    name: string;
    price: number;
    originalPrice?: number;
    currency?: string;
    meta?: string; // variant label, status, etc.
    quantity?: number; // undefined = no quantity control
    actions: ProductListAction[];
};

export interface ProductListSummary {
    label: string;
    value: string;
};

export interface ProdructListContent {
    title: string;
    items: ProductListItem[];
    summary?: ProductListSummary[];
    emptyMessage?: string;
    headerAction?: ProductListAction; // e.g. "Clear all"
};

