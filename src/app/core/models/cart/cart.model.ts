import { Product } from "../product/product.model";

export interface CartItem {
    id: number;
    cart_id: number;
    product_variant_id: number;
    quantity: number;
    product?: Product;
};

export interface Cart {
    id: number;
    user_id?: number;
    session_id?: number;
    items: CartItem[];
    total?: number;
};