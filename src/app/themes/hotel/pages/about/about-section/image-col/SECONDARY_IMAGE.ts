import { MediaImg } from "@core/models/media/media-img.interface";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const SECONDARY_IMAGE: SequenceSpaceItem = {
    id: 2,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/about-img-2.jpg',
            alt: 'about us secondary image',
        } as MediaImg,
    },
};