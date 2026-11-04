import { MediaImg } from "@core/models/media/media-img.interface";
import { faShoppingCart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardItem } from "@ui-building/card-grid/card-grid.interface";

export const SHOP_CARD_3: CardItem = {
    id: 2,
    image: {
        src: 'assets/collection-info/shop-product-3.jpg' as string,
        alt: 'shop-product-3' as string,
        placeholder:'shop-product-3' as string,
    } as MediaImg,
    content: [
        {
            id: 0,
            heading: {
                id: 0,
                headingType: 'h3',
                achorFlexList: [
                    {
                        id: 0,
                        title: 'Rings' as string,
                        description: 'shop-product-3' as string,
                        ariaLabel: 'shop-product-3' as string,
                        rlink: '/shop/3' as string,
                        switchAbleIcon: { type: 'none' } as IconSwitch,
                    } as AnchorFlexItem,
                ] as AnchorFlexItem[],
            } as FlexHeadingItem,
            text: ['old-price: $180.00', '$150.00'] as string[],
            buttonSection: [
                {
                    id: 0,
                    title: 'Add to cart' as string,
                    type: 'button',
                    customClassName: ['shop-add-to-cart'] as string[],
                    iconType: { type: 'iconAwesome', currentIcon: faShoppingCart as IconDefinition, } as IconSwitch,
                },
            ] as ButtonItem[],
            customBlockClassName: 'shop-card-block-3' as string,
        } as TextBox,
    ] as TextBox[],
    customClassName: ['shop-card-3'] as string[],
    link: '/shop/3' as string,
} as CardItem;