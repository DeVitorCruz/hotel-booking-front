import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const PRODUCT_1: ProductListItem = {
    id: 0 as number,
    image: {
        src: 'assets/collection-info/shop-product-1.jpg' as string,
        alt: 'shop-product-1' as string,
        placeholder: 'shop-product-1' as string,
    } as MediaImg,
    name: 'Tiara' as string,
    price:  220.00 as number,
    originalPrice: 250.00 as number,
    currency: '$' as string,
    quantity: 3 as number,
    actions: [
        {
            id: 0,
            label: 'Remove' as string,
            customClassName: ['product-list__remove-btn'] as string[],
            handler: (itemId: number = 0) => { console.log("Product item", itemId); },
        } as ProductListAction,
    ] as ProductListAction[],
} as ProductListItem;
