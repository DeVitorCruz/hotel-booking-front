import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_4: ProductListItem = {
    id: 3 as number,
    image: {
        src: 'assets/collection-info/shop-product-4.jpg' as string,
        alt: 'shop-product-4' as string,
        placeholder: 'shop-product-4' as string,
    } as MediaImg,
    name: 'Choker' as string,
    price: 80.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'delivered'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;