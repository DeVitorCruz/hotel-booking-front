import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_2: ProductListItem = {
    id: 1 as number,
    image: {
        src: 'assets/collection-info/shop-product-2.jpg' as string,
        alt: 'shop-product-2' as string,
        placeholder: 'shop-product-2' as string,
    } as MediaImg,
    name: 'Earrings' as string,
    price: 150.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'shipped'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;