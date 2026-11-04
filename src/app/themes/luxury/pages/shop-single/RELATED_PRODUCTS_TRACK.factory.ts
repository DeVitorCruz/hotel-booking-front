import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { Product, ProductVariant } from "@core/models/product/product.model";
import { SlideSwiperScreen } from "@shared/ui/side-slide/slide-swiper-screen.interface";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { FlexCardItem } from "@shared/ui/flex-card/flex-card-item";
import { MediaImg } from "@core/models/media/media-img.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { SlidItem } from "@shared/ui/side-slide/slide-item.interface";
import { SwiperButton } from "@shared/ui/side-slide/slide-next-button.interface";
import { SwiperOptions } from "swiper/types";
import { faArrowLeft, faArrowRight, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CARD_SWIPER_TRACK_CONFIG } from "../home/card-track/CARD_SWIPER_TRACK_CONFIG";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { Type } from "@angular/core";
import { FlexCollectionComponent } from "@shared/ui/flex-collection/flex-collection.component";
import { FlexCollectionItem } from "@shared/ui/flex-collection/flex-collection-item.interface";
import { SlideComponent } from "@shared/ui/side-slide/slide.component";


export function buildRelatedProductsTrack(products: Product[]): ContainerBlock {
    const SLIDES: SlideSwiperScreen[] = products.map((product, index) => {
        const VARIANT: ProductVariant | undefined = product.variants?.[0];
        return {
            id: index,
            swiperComponent: FlexCardComponent,
            swiperInput: {
                FLEX_CARD_ITEM: {
                    id: product.id,
                    head: {
                        src: product.image ?? 'assets/collection-info/1-earring-gold-large.jpg' as string,
                        alt: product.name as string,
                    } as MediaImg,
                    body: [{
                        id: 0 as number,
                        heading: {
                            id: 0 as number,
                            headingType: 'h2',
                            text: '' as string,
                            achorFlexList: [{
                                id: 0 as number,
                                title: product.name as string,
                                ariaLabel: product.name as string,
                                rlink: `/shop/${product.id}` as string,
                                switchAbleIcon: { type: 'none' } as IconSwitch,
                            } as AnchorFlexItem] as AnchorFlexItem[],
                        } as FlexHeadingItem,
                        text: VARIANT ? [`${VARIANT.price.toFixed(2)}`] : [] as string[],
                    } as TextBox,] as TextBox[], 
                    customClassName: [] as string[],
                    customBlockClassName: 'card-item-1-track-block' as string,
                } as FlexCardItem,
            } as Record<string, any>,
        } as SlideSwiperScreen;
    });

    const SLIDE_ITEM: SlidItem = {
        buttonList: [
            {
                id: 0,
                title: '' as string,
                type: 'button',
                customClassName: [] as string[],
                iconType: {
                    type: 'iconAwesome',
                    currentIcon: faArrowLeft as IconDefinition,
                } as IconSwitch,
                classNameSwiper: 'swiper-button-prev' as string,
            } as SwiperButton,
            {
                id: 1,
                title: '' as string,
                type: 'button',
                customClassName: [] as string[],
                iconType: {
                    type: 'iconAwesome',
                    currentIcon: faArrowRight as IconDefinition,
                } as IconSwitch,
                classNameSwiper: 'swiper-button-next' as string,
            } as SwiperButton,
        ] as SwiperButton[],
        swiperSlideList: SLIDES as SlideSwiperScreen[],
        slideConfig: CARD_SWIPER_TRACK_CONFIG as SwiperOptions,
        containerClassName: 'card-collection-track' as string,
    } as SlidItem;
    
    return {
        id: 99 as number,
        customBlockClassName: 'card-track-block' as string,
        customElementClassName: 'card-track-element' as string,
        customClassName: [] as string[],
        items: [
            {
                id: 0 as number,  
                customClassName: [] as string[],
                component: FlexCollectionComponent as Type<any>,
                componentInput: {
                    FLEX_COLLECTION_ITEM: {
                        header: [
                            {
                                id: 0 as number,
                                heading: {
                                    id: 0 as number,
                                    headingType:  'h2',
                                    text: 'Related Products' as string,
                                } as FlexHeadingItem,
                                text: ['You may also like these.'] as string[],
                                customBlockClassName: 'content-collection-track-block-header' as string,
                            } as TextBox,
                        ] as TextBox[],
                        customClassName: [] as string[],
                        customBlockClassName: 'content-collection-track-block' as string,
                        bodyList: [
                            {
                                id: 0 as number,  
                                customClassName: [] as string[],
                                component: SlideComponent as Type<any>,
                                componentInput: {
                                    SLIDE_ITEM
                                } as Record<string, any>,
                            } as SequenceSpaceItem,
                        ] as SequenceSpaceItem[],
                        bodyBlockClassName: 'content-collection-track-body-block' as string,
                        bodyElementClassName: 'content-collection-track-body-element' as string,
                    } as FlexCollectionItem,
                } as Record<string, any>,
            } as SequenceSpaceItem,
        ] as SequenceSpaceItem[],
    } as ContainerBlock;
}