import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const PRODUCT_2: ProductListItem = {
    id: 1 as number,
    image: {
        src: 'assets/collection-info/shop-product-2.jpg' as string,
        alt: 'shop-product-2' as string,
        placeholder: 'shop-product-2' as string,
    } as MediaImg,
    name: 'Earrings' as string,
    price:  150.00 as number,
    originalPrice: 200.00 as number,
    currency: '$' as string,
    quantity: 2 as number,
    actions: [
        {
            id: 0,
            label: 'Remove' as string,
            customClassName: ['product-list__remove-btn'] as string[],
            handler: (itemId: number = 1) => { console.log("Product item", itemId); },
        } as ProductListAction,
    ] as ProductListAction[],
} as ProductListItem;
