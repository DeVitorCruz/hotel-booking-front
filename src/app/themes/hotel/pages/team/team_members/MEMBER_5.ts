import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardItem } from "@ui-building/card-grid/card-grid.interface";

export const MEMBER_5: CardItem = {
    id: 4,
    image: {
        src: 'assets/collection-info/team-about-img-5.jpg',
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
                        title: 'Elizabeth Chaffin'.toUpperCase(),
                        ariaLabel: 'elizabeth chaffin',
                        rlink: '/team/5',
                        switchAbleIcon: { type: 'none' } as IconSwitch,
                    }
                ] as AnchorFlexItem[],
            } as FlexHeadingItem,
            text: ['Designation'] as string[],
            customBlockClassName: 'team-member-content',
        } as TextBox,
    ] as TextBox[],
    customClassName: ['card-member-5'] as string[],
} as CardItem;