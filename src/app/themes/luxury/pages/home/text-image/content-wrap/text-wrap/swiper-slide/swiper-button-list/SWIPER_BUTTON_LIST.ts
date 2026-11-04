import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SwiperButton } from "@shared/ui/side-slide/slide-next-button.interface"; 
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { TAILWIND_BUTTON_NEXT } from "./tailwindCollect/TAILWIND_BUTTON_NEXT";
import { TAILWIND_BUTTON_PREV } from "./tailwindCollect/TAILWIND_BUTTON_PREV";

export const SWIPER_BUTTON_LIST: SwiperButton[] = [
    {
        id: 0,
        title: '',
        type: 'button',
        customClassName: TAILWIND_BUTTON_PREV,
        classNameSwiper: 'swiper-button-prev',
        iconType: { 
            type: 'iconAwesome',
            currentIcon:  faArrowLeft as IconDefinition
        } as IconSwitch,
    },
    {
        id: 1,
        title: '',
        type: 'button',
        customClassName: TAILWIND_BUTTON_NEXT,
        classNameSwiper: 'swiper-button-next',
        iconType: { 
            type: 'iconAwesome',
            currentIcon: faArrowRight as IconDefinition
        } as IconSwitch,
    },
];