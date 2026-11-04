import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_3: ProductListItem = {
    id: 2 as number,
    image: {
        src: 'assets/collection-info/shop-product-3.jpg' as string,
        alt: 'shop-product-3' as string,
        placeholder: 'shop-product-3' as string,
    } as MediaImg,
    name: 'Rings' as string,
    price: 150.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'processing'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;