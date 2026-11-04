import { MediaImg } from "@core/models/media/media-img.interface";
import { TabPanelContent } from "@ui-building/tab-panel/tab-panel.interface";

export interface ProductSingleImage {
    main: MediaImg;
    thumbs: MediaImg[];
};

export interface ProductSinglePrice {
    regular: number;
    discount?: number;
    currency?: string;
};

export interface ProductSingleContent {
    images: ProductSingleImage;
    title: string;
    rating: number;
    reviewCount: number;
    price: ProductSinglePrice;
    description: string;
    category?: string;
    tags?: string[];
    tabPanel: TabPanelContent;
};


