import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_6: ProductListItem = {
    id: 5 as number,
    image: {
        src: 'assets/collection-info/shop-product-6.jpg' as string,
        alt: 'shop-product-6' as string,
        placeholder: 'shop-product-6' as string,
    } as MediaImg,
    name: 'Bracelet' as string,
    price: 18.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'pending'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;