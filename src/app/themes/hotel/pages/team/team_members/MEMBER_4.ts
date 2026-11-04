import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardItem } from "@ui-building/card-grid/card-grid.interface";

export const MEMBER_4: CardItem = {
    id: 3,
    image: {
        src: 'assets/collection-info/team-about-img-4.jpg',
        alt: 'Designation',
    } as MediaImg,
    content: [
         {
            id: 0,
            heading: {
                id: 0,
                headingType: 'h2',
                achorFlexList: [
                    {
                        id: 0,
                        title: 'Cynthia Wright'.toUpperCase(),
                        ariaLabel: 'cynthia wright',
                        rlink: '/team/4',
                        switchAbleIcon: { type: 'none' } as IconSwitch,
                    }
                ] as AnchorFlexItem[],
            } as FlexHeadingItem,
            text: ['Designation'] as string[],
            customBlockClassName: 'team-member-content',
        } as TextBox,
    ] as TextBox[],
    customClassName: ['card-member-4'] as string[],
} as CardItem;