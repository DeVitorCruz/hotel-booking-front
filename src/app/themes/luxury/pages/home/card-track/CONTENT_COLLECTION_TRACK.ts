import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { FlexCollectionComponent } from "@shared/ui/flex-collection/flex-collection.component";
import { FlexCollectionItem } from "@shared/ui/flex-collection/flex-collection-item.interface";
import { TAILWIND_CONTENT_COLLECTION_TRACK } from "./tailwindCollect/TAILWIND_CONTENT_COLLECTION_TRACK";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SlideComponent } from "@shared/ui/side-slide/slide.component";
import { SlidItem } from "@shared/ui/side-slide/slide-item.interface";
import { SwiperButton } from "@shared/ui/side-slide/slide-next-button.interface";
import { SlideSwiperScreen } from "@shared/ui/side-slide/slide-swiper-screen.interface";
import { CARD_ITEM_1 } from "./CARD_ITEM_1";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { faArrowLeft, faArrowRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CARD_SWIPER_TRACK_CONFIG } from "./CARD_SWIPER_TRACK_CONFIG";
import { CARD_ITEM_3 } from "./CARD_ITEM_3";
import { CARD_ITEM_2 } from "./CARD_ITEM_2";
import { CARD_ITEM_4 } from "./CARD_ITEM_4";
import { CARD_ITEM_5 } from "./CARD_ITEM_5";


export const CONTENT_COLLECTION_TRACK: SequenceSpaceItem = {
    id: 2,  
    customClassName: TAILWIND_CONTENT_COLLECTION_TRACK,
    component: FlexCollectionComponent,
    componentInput: {
        FLEX_COLLECTION_ITEM: {
            header: [{
                id: 0,
                heading: {
                    id: 0,
                    headingType: 'h2',
                    text: 'NEW ARRIVAL',
                } as FlexHeadingItem,
                text: ['Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer.'],
                customBlockClassName: 'content-collection-track-block-header',
            } as TextBox],
            customClassName: [],
            customBlockClassName: 'content-collection-track-block',
            bodyList: [
                {
                id: 0,  
                customClassName: [],
                component: SlideComponent,
                componentInput: {
                    SLIDE_ITEM: {
                        buttonList: [
                            { 
                                id: 0,
                                title: '',
                                type: 'button',
                                customClassName: [],
                                iconType: {
                                    type: 'iconAwesome',
                                    currentIcon:  faArrowLeft as IconDefinition
                                } as IconSwitch,
                                classNameSwiper: 'swiper-button-prev', 
                            } as SwiperButton, 
                            { 
                                id: 1,
                                title: '',
                                type: 'button',
                                customClassName: [],
                                iconType: {
                                    type: 'iconAwesome',
                                    currentIcon:  faArrowRight as IconDefinition
                                } as IconSwitch,
                                classNameSwiper: 'swiper-button-next', 
                            } as SwiperButton, 
                        ],
                        swiperSlideList: [
                            CARD_ITEM_1 as SlideSwiperScreen,
                            CARD_ITEM_2 as SlideSwiperScreen,
                            CARD_ITEM_3 as SlideSwiperScreen,
                            CARD_ITEM_4 as SlideSwiperScreen,
                            CARD_ITEM_5 as SlideSwiperScreen,
                        ],
                        slideConfig: CARD_SWIPER_TRACK_CONFIG,
                        containerClassName: 'card-collection-track',
                    } as SlidItem
                },  
                } as SequenceSpaceItem 
            ],
            bodyBlockClassName: 'content-collection-track-body-block',
            bodyElementClassName: 'content-collection-track-body-element',
        } as FlexCollectionItem
    },
};
