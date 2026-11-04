export interface ProductVariant {
    id: number;
    label: string;
    price: number;
    discount_price?: number;
    stock: number;
};

export interface ProductReview {
    id: number;
    author: string;
    avatar?: string;
    date: string;
    rating: number; // 1-5
    comment: string;
};

export interface Product {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    images?: string[];
    is_active: boolean;
    category_id: number;
    category?: string; // <- category name
    tags?: string[]; // <- tag names
    rating?: number; // <- average 1-5
    specs?: string; // <- plain text for now 
    variants?: ProductVariant[];
    reviews?: ProductReview[];
};