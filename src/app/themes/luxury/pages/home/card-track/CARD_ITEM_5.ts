import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { MediaImg } from "@core/models/media/media-img.interface";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SlideSwiperScreen } from "@shared/ui/side-slide/slide-swiper-screen.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { ImgFlexAddiction } from "@shared/ui/img-flex/img-flex-addiction.interface";

export const CARD_ITEM_5: SlideSwiperScreen = {
    id: 4,
    swiperComponent: FlexCardComponent,
    swiperInput: {
        FLEX_CARD_ITEM: {
            id: 0,
            head: {
                src: 'assets/collection-info/track-collect-3.jpg',
                alt: '',
            } as MediaImg,
            body: [{
                id: 0,
                heading: {
                    id: 0,
                    headingType: 'h2',
                    text: '',
                    achorFlexList: [
                        {
                            id: 0,
                            title: 'PRODUCT NAME',
                            description: '',
                            ariaLabel: '',
                            rlink: '',
                            switchAbleIcon: {
                                type: 'none'
                            }
                        }
                    ]
                } as FlexHeadingItem,
                text: ['$890.00'],
                customBlockClassNames: 'card-item-5-track-block-body',
            } as TextBox], 
            customClassName: [],
            customBlockClassName: 'card-item-5-track-block',
            imgFlexAddiction: [
                {
                    imgIcon: {
                        type: 'iconAwesome',
                        currentIcon: faHeart as IconDefinition,
                    } as IconSwitch,
                    imgText: '',
                } as ImgFlexAddiction,
            ]
        }
    }
};