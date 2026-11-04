import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const PRODUCT_4: ProductListItem = {
    id: 3 as number,
    image: {
        src: 'assets/collection-info/shop-product-4.jpg' as string,
        alt: 'shop-product-4' as string,
        placeholder: 'shop-product-4' as string,
    } as MediaImg,
    name: 'Choker' as string,
    price:  80.00 as number,
    originalPrice: 100.00 as number,
    currency: '$' as string,
    quantity: 5 as number,
    actions: [
        {
            id: 0,
            label: 'Remove' as string,
            customClassName: ['product-list__remove-btn'] as string[],
            handler: (itemId: number = 3) => { console.log("Product item", itemId); },
        } as ProductListAction,
    ] as ProductListAction[],
} as ProductListItem;
