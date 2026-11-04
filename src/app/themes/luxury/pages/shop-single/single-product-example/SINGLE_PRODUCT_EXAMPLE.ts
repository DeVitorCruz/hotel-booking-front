import { ProductSingleContent, ProductSingleImage, ProductSinglePrice } from "@ui-building/product-single/product-single.interface";
import { TabPanelContent } from "@ui-building/tab-panel/tab-panel.interface";
import { PRODUCT_SINGLE_IMAGE } from "./PRODUCT_SINGLE_IMAGE";
import { PRODUCT_SINGLE_PRICE } from "./PRODUCT_SINGLE_PRICE";
import { PRODUCT_TABPANEL } from "./PRODUCT_TABPANEL";

export const SINGLE_PRODUCT_EXAMPLE: ProductSingleContent = {
    images: PRODUCT_SINGLE_IMAGE as ProductSingleImage,
    title: 'Earrings Jewel Luxury' as string,
    rating: 4 as number,
    reviewCount: 3 as number,
    price: PRODUCT_SINGLE_PRICE as ProductSinglePrice,
    description: 'Keep your home organized, yet elegant with storage cabinets by Onita Patio Furniture. Traditionally designed, they are perfect to be used in the any place where you need to store.' as string,
    category: 'Jewellery' as string,
    tags: ['earring', 'jewel', 'ears'] as string[],
    tabPanel: PRODUCT_TABPANEL as TabPanelContent,
} as ProductSingleContent;