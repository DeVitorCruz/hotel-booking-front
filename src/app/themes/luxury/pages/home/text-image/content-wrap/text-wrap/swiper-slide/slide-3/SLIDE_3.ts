import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SlideSwiperScreen } from "@shared/ui/side-slide/slide-swiper-screen.interface";  
import { ICON_SWIPER_WRAP } from "../swiper-slide-list/icon-swiper-wrap/ICON_SWIPER_WRAP";
import { SUB_TEXT_SWIPER } from "./sub-text-swiper-wrap/SUB_TEXT_SWIPER";
import { TEXT_SWIPER_SLIDE } from "./TEXT_SWIPER_SLIDE";
import { TAILWIND_SLID_3 } from "./tailwindCollect/TAILWIND_SLID_3";

export const SLIDE_3: SlideSwiperScreen = {
    id: 2,
    swiperComponent: ContainerComponent,
    swiperInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 2,
            customBlockClassName: 'swiper-slid-list-block',
            customElementClassName: 'swiper-slid-list-element',
            customClassName: TAILWIND_SLID_3,
            items: [
                ICON_SWIPER_WRAP,
                TEXT_SWIPER_SLIDE,
                SUB_TEXT_SWIPER
            ],
        } as ContainerBlock
    },
};