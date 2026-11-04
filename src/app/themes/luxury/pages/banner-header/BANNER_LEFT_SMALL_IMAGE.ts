import { MediaImg } from "@core/models/media/media-img.interface";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";


export const BANNER_LEFT_SMALL_IMAGE: SequenceSpaceItem = {
    id: 0,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/pagetitle-about.png',
            alt: 'banner left image',
        } as MediaImg
    },
};