import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";

export const FIRST_CARD: SequenceSpaceItem = {
    id: 0,  
    customClassName: [],
    component: FlexCardComponent,
    componentInput: {
        FLEX_CARD_ITEM: {
            id: 0,
            head: {
                src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/collection-card/first-card/first-card-img-1.jpg',
                alt: '',
                placeholder: '',
            },
            body: [
                {
                    id: 0,
                    heading: {
                        id: 0,
                        headingType: 'h2',
                        text: 'RINGS COLLECTION',
                    },
                    text: ['Neque convallis a cras semper auctor amet luctus.'],
                    anchorLink: [
                        {
                            id: 0,
                            title: 'See More',
                            description: '',
                            ariaLabel: '',
                            rlink: '',
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
