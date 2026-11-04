import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_IMAGE_WRAP } from "./tailwindCollect/TAILWIND_IMAGE_WRAP";


export const IMAGE_WRAP: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_IMAGE_WRAP,
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/text-image/content-wrap/image-wrap/trastimonial-image.jpg',    
            alt: 'center testimonial image',
        }
    },
};

