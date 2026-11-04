export interface ReviewCardItem {
    id: number;
    author: string;
    avatar?: string;
    date: string;
    rating: number;
    comment: string;
};

export interface ReviewPanelContent {
    reviews: ReviewCardItem[];
    productId: number;
};