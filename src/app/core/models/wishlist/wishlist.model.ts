import { Product } from '../product/product.model';

export interface WishlistItem {
    id: number;
    wishlist_id: number;
    product_id: number;
    product?: Product;
};

export interface Wishlist {
    id: number;
    user_id: number;
    products: Product[];
};