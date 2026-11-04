import type { SwiperOptions } from "swiper/types";
import { Navigation, Pagination } from 'swiper/modules';

export const TEXT_SWIPER_SLIDE_CONFIG: SwiperOptions = {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    direction: 'horizontal',
    spaceBetween: 0,
    loop: true,
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    scrollbar: {
        el: '.swiper-scrollbar'
    }
};