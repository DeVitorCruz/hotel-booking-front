import { faClose, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MediaImg } from "@core/models/media/media-img.interface";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FlexCardItem } from "@shared/ui/flex-card/flex-card-item";
import { TAILWIND_MAIN_PRODUCT_1_CLASS_LIST } from "./tailwindCollect/TAILWIND_MAIN_PRODUCT_1_CLASS_LIST";
import { TAILWIND_PRODUCT_INNER_1_CLASS_LIST } from "./tailwindCollect/TAILWIND_PRODUCT_INNER_1_CLASS_LIST";
import { TAILWIND_CLOSE_BUTTON } from "./tailwindCollect/TAILWIND_CLOSE_BUTTON";

export const PRODUCT_1_ITEM: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_MAIN_PRODUCT_1_CLASS_LIST,
    component: ContainerComponent,
    componentInput: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'product_item_block-1',
            customElementClassName: 'product_item_element-1',
            customClassName: TAILWIND_PRODUCT_INNER_1_CLASS_LIST,
            items: [
                {
                    id: 0,  
                    customClassName: [],
                    component: FlexCardComponent,
                    componentInput: {
                        FLEX_CARD_ITEM: {
                            id: 0,
                            head: {
                                src: 'assets/collection-info/mini-photo/img-1.jpg',
                                alt: '',
                                placeholder: '',
                            } as MediaImg,
                            body: [{
                                id: 0,
                                heading: {
                                    id: 0,
                                    headingType: 'h2',
                                    text: 'Ear Ring',
                                } as FlexHeadingItem,
                                text: ['$20.15 x 1'],
                                buttonSection: [{
                                    id: 0,
                                    title: '',
                                    type: 'button',
                                    customClassName: TAILWIND_CLOSE_BUTTON,
                                    iconType: {
                                        type: 'iconAwesome',
                                        currentIcon: faClose as IconDefinition,
                                    } as IconSwitch,
                                } as ButtonItem],
                                customBlockClassName: '',
                            } as TextBox
                        ], 
                        } as FlexCardItem
                    },
                } as SequenceSpaceItem,
            ],
        } as ContainerBlock
    },
};