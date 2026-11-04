import type { SwiperOptions } from "swiper/types";
import { SwiperButton } from "./slide-next-button.interface";
import { SlideSwiperScreen } from "./slide-swiper-screen.interface";

export interface SlidItem {
    buttonList: SwiperButton[];
    swiperSlideList: SlideSwiperScreen[];
    slideConfig?: SwiperOptions;
    containerClassName: string;
    thumbs?: SlidItem; 
};