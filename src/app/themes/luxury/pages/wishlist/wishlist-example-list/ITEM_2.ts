import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";
import { ACTIONS } from "./ACTIONS";

export const ITEM_2: ProductListItem = {
    id: 1 as number,
    image: {
        src: 'assets/collection-info/shop-product-2.jpg' as string,
        alt: 'shop-product-2' as string,
        placeholder: 'shop-product-2' as string,
    } as MediaImg,
    name: 'Earrings' as string,
    price: 150.00 as number,
    originalPrice: 200.00 as number,
    currency: '$' as string, 
    actions: ACTIONS as ProductListAction[],  
} as ProductListItem;