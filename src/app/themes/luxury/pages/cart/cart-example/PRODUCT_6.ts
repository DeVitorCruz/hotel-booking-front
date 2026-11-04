import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const PRODUCT_6: ProductListItem = {
    id: 5 as number,
    image: {
        src: 'assets/collection-info/shop-product-6.jpg' as string,
        alt: 'shop-product-6' as string,
        placeholder: 'shop-product-6' as string,
    } as MediaImg,
    name: 'Bracelet' as string,
    price:  18.00 as number,
    originalPrice: 20.00 as number,
    currency: '$' as string,
    quantity: 4 as number,
    actions: [
        {
            id: 0,
            label: 'Remove' as string,
            customClassName: ['product-list__remove-btn'] as string[],
            handler: (itemId: number = 5) => { console.log("Product item", itemId); },
        } as ProductListAction,
    ] as ProductListAction[],
} as ProductListItem;
