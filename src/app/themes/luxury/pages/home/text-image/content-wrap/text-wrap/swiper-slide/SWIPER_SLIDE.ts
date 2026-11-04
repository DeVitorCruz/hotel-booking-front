import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SlideComponent } from "@shared/ui/side-slide/slide.component";
import { SlidItem } from "@shared/ui/side-slide/slide-item.interface";
import { SWIPER_BUTTON_LIST } from "./swiper-button-list/SWIPER_BUTTON_LIST";
import { SWIPER_SLIDE_LIST } from "./swiper-slide-list/SWIPER_SLIDE_LIST";
import { TEXT_SWIPER_SLIDE_CONFIG } from "./TEXT_SWIPER_SLIDE_CONFIG";

export const SWIPER_SLIDE: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: SlideComponent,
    componentInput: {
        SLIDE_ITEM: {
            swiperSlideList: SWIPER_SLIDE_LIST,
            buttonList: SWIPER_BUTTON_LIST,
            slideConfig: TEXT_SWIPER_SLIDE_CONFIG,
            containerClassName: 'slide-text-wrap',
        } as SlidItem,
    },
};