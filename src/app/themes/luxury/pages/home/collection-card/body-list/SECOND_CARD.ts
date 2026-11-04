import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";

export const SECOND_CARD: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: FlexCardComponent,
    componentInput: {
        FLEX_CARD_ITEM: {
            id: 1,
            head: {
                src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/collection-card/second-card/second-card-img-2.jpg',
                alt: '',
                placeholder: '',
            },
            body: [
                {
                    id: 0,
                    heading: {
                        id: 0,
                        headingType: 'h2',
                        text: 'NECKLAGES COLLECTION',
                    },
                    text: ['Neque convallis a cras semper auctor amet luctus.'],
                    anchorLink: [
                        {
                            id: 0,
                            title: 'See More',
                            description: '',
                            ariaLabel: '',
                            rlink: 'See More',
                            switchAbleIcon: {
                                type: 'none'
                            }
                        }
                    ],
                }
            ], 
            customClassName: [],
        }
    },
};
