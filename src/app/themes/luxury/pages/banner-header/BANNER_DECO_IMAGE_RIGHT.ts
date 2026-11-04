import { MediaImg } from "@core/models/media/media-img.interface";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";


export const BANNER_DECO_IMAGE_RIGHT: SequenceSpaceItem = {
    id: 2,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/about-shape-2.png',
            alt: 'banner decoratiove right image',
        } as MediaImg
    },
};