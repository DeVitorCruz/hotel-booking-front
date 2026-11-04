import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_1: ProductListItem = {
    id: 0 as number,
    image: {
        src: 'assets/collection-info/shop-product-1.jpg' as string,
        alt: 'shop-product-1' as string,
        placeholder: 'shop-product-1' as string,
    } as MediaImg,
    name: 'Tiara' as string,
    price: 220.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'pending'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;