import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const HEADER_LOGO_COLUMN: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/logo-2.svg',    
            alt: 'left corner image',
        }
    },
};