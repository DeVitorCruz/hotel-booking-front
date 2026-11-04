import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_LEFT_IMAGE } from "./tailwindCollect/TAILWIND_LEFT_IMAGE";

export const LEFT_IMAGE: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_LEFT_IMAGE,
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/static-hero/img-2.jpg',    
            alt: 'left corner image',
        }
    },
};

