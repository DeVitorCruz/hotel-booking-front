import { MediaImg } from "@core/models/media/media-img.interface";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SlideSwiperScreen } from "@shared/ui/side-slide/slide-swiper-screen.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { ImgFlexAddiction } from "@shared/ui/img-flex/img-flex-addiction.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const CARD_ITEM_1: SlideSwiperScreen = {
    id: 0,
    swiperComponent: FlexCardComponent,
    swiperInput: {
        FLEX_CARD_ITEM: {
            id: 0,
            head: {
                src: 'assets/collection-info/track-collect-1.jpg',
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
                customBlockClassNames: 'card-item-1-track-block-body',
            } as TextBox], 
            customClassName: [],
            customBlockClassName: 'card-item-1-track-block',
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