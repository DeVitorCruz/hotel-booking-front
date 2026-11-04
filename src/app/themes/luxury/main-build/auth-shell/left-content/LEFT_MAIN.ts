import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { ImgFlex } from "@shared/ui/img-flex/img-flex.component";
import { MediaImg } from "@core/models/media/media-img.interface";


export const LEFT_MAIN: SequenceSpaceItem = {
    id: 1,  
    customClassName: [] as string[],
    component: ImgFlex,
    componentInput: {
        IMAGE_FLEX_ITEM: {
            src: 'assets/collection-info/login-main.png',
            alt: 'Login image',
        } as MediaImg,
    },
} as SequenceSpaceItem;