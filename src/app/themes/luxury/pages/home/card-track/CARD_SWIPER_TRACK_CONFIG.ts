import type { SwiperOptions } from "swiper/types";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export const CARD_SWIPER_TRACK_CONFIG: SwiperOptions = {
    modules: [Navigation, Pagination, Autoplay],
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
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },   
        1280: {
            slidesPerView: 4
        }
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    }
};