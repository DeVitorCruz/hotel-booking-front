import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_RIGHT_IMAGE } from "./tailwindCollect/TAILWIND_RIGHT_IMAGE";

export const RIGHT_IMAGE: SequenceSpaceItem = {
    id: 2,  
    customClassName: TAILWIND_RIGHT_IMAGE,
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/static-hero/img-3.jpg',    
            alt: 'Right corner image',
        }
    },
};

