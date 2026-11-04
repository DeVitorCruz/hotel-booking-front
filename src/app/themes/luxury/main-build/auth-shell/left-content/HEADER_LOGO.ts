import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlex } from "@shared/ui/anchor-flex/anchor-flex.component";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const HEADER_LOGO: SequenceSpaceItem = {
    id: 0,  
    customClassName: [] as string[],
    component: AnchorFlex,
    componentInput: {
        ANCHOR_FLEX_ITEM: {
            id: 0,
            ariaLabel: 'Home',
            rlink: '/home',
            switchAbleIcon: { type: 'none' } as IconSwitch,
            imageFlex: {
                src: 'assets/collection-info/logo.svg',
                alt: 'Logo',
            } as MediaImg,
        }    
    },
} as SequenceSpaceItem;