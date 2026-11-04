import { CardItem } from "@ui-building/card-grid/card-grid.interface";

export const MEMBER_1: CardItem = {
    id: 0,
    image: {
        src: 'assets/collection-info/team-about-img-1.jpg',
        alt: 'Frederick Norris',
    },
    content: [
        {
            id: 0,
            heading: { id: 0, headingType: 'h3', text: 'Frederick Norris' },
            text: ['Designation'],
        }
    ],
    link: '/team/1',
};