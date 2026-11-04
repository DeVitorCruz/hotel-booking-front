import { Type } from "@angular/core";
import { ProductSingleComponent } from "./product-single.component";

export const PRODUCT_SINGLE_REGISTRY: Record<string, Type<any>> = {
    'default': ProductSingleComponent,
    // 'minimal': ProductSingleMinimalComponent, <- future
    // 'featured': ProductSingleFeaturedComponent, <- future
};

export type ProductSingleTemplate = keyof typeof PRODUCT_SINGLE_REGISTRY;