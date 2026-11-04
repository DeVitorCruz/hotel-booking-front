import { MediaImg } from "@core/models/media/media-img.interface";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { FlexHeadingItem } from "@shared/ui/flex-heading/flex-heading-item";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { CardGridContent, CardItem } from "@ui-building/card-grid/card-grid.interface";
import { BLOG_HEADER } from "./BLOG_HEADER";

const makeCard = (id: number, title: string, excerpt: string, img: string): CardItem => ({
    id: id as number,
    image: { src: title as string, alt: excerpt as string, } as MediaImg,
    content: [
        {
            id: 0 as number,
            text: [ '01 Jan 2025', `By Admin`,] as string[],
        } as TextBox,
        {
            id: 1 as number,
            heading: {
                id: 0 as number,
                headingType: 'h3',
                text: '' as string,
                achorFlexList: [
                    {
                    id: 0 as number,
                    title: title as string,
                    ariaLabel: title as string,
                    rlink: `/blog/${id}` as string,
                    switchAbleIcon: { type: 'none' } as IconSwitch,
                    } as AnchorFlexItem,
                ] as AnchorFlexItem[],
            } as FlexHeadingItem,
        } as TextBox,
        {
            id: 2 as number,
            text: [excerpt] as string[],
        } as TextBox,
    ] as TextBox[],
    customClassName: ['blog-card'] as string[],
    link: `/blog/${id}` as string,
} as CardItem);

export const BLOG_EXAMPLE_LIST: CardGridContent = {
    header: BLOG_HEADER as TextBox[],
    cards: [
        makeCard(1, 'The Art of Fine Jewelry', 'Discover the craftsmanship behind our most iconic pieces.', 'assets/collection-info/about-img-1.jpg'),
        makeCard(2, 'Gold vs Silver — Which is Right for You?', 'A guide to choosing the perfect metal for your next piece.', 'assets/collection-info/about-img-2.jpg'),
        makeCard(3, 'How to Care for Your Jewelry', 'Simple tips to keep your pieces looking their best.', 'assets/collection-info/img-1.jpg'),
        makeCard(4, 'The History of Diamond Cutting', 'From rough stone to brilliant gem — the journey of a diamond.', 'assets/collection-info/img-2.jpg'),
        makeCard(5, 'Trends in Jewelry Design 2025', 'What is shaping the world of fine jewelry this year.', 'assets/collection-info/img-3.jpg'),
        makeCard(6, 'Gifting Jewelry — A Timeless Tradition', 'Why jewelry remains the most meaningful gift you can give.', 'assets/collection-info/track-collect-1.jpg'),
    ] as CardItem[],
    gridClassName: 'blog' as string,
    sectionClassName: 'blog-grid' as string,
} as CardGridContent;