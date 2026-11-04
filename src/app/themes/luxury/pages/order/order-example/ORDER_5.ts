import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";

export const ORDER_5: ProductListItem = {
    id: 4 as number,
    image: {
        src: 'assets/collection-info/shop-product-5.jpg' as string,
        alt: 'shop-product-5' as string,
        placeholder: 'shop-product-5' as string,
    } as MediaImg,
    name: 'Locket' as string,
    price: 80.00 as number,
    currency: '$' as string,
    meta: `Order #${0} - ${'cancelled'}` as string,
    actions: [] as ProductListAction[],
} as ProductListItem;