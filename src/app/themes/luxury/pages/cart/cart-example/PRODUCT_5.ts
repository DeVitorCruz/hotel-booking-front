import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const PRODUCT_5: ProductListItem = {
    id: 4 as number,
    image: {
        src: 'assets/collection-info/shop-product-5.jpg' as string,
        alt: 'shop-product-5' as string,
        placeholder: 'shop-product-5' as string,
    } as MediaImg,
    name: 'Locket' as string,
    price:  80.00 as number,
    originalPrice: 100.00 as number,
    currency: '$' as string,
    quantity: 6 as number,
    actions: [
        {
            id: 0,
            label: 'Remove' as string,
            customClassName: ['product-list__remove-btn'] as string[],
            handler: (itemId: number = 4) => { console.log("Product item", itemId); },
        } as ProductListAction,
    ] as ProductListAction[],
} as ProductListItem;
