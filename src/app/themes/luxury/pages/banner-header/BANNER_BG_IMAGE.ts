import { MediaImg } from "@core/models/media/media-img.interface";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";


export const BANNER_BG_IMAGE: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/bind-banner-pagetitle-1.jpg',
            alt: 'banner background',
        } as MediaImg
    },
};