import { MediaImg } from "@core/models/media/media-img.interface";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";


export const BANNER_BG_IMAGE: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/hotel/banner-side.svg',
            alt: 'banner background',
        } as MediaImg
    },
};