import { MediaImg } from "@core/models/media/media-img.interface";
import { ProductListAction, ProductListItem } from "@ui-building/product-list/product-list.interface";
import { ACTIONS } from "./ACTIONS";

export const ITEM_5: ProductListItem = {
    id: 4 as number,
    image: {
        src: 'assets/collection-info/shop-product-5.jpg' as string,
        alt: 'shop-product-5' as string,
        placeholder: 'shop-product-5' as string,
    } as MediaImg,
    name: 'Locket' as string,
    price: 40.00 as number,
    originalPrice: 50.00 as number,
    currency: '$' as string, 
    actions: ACTIONS as ProductListAction[],  
} as ProductListItem;