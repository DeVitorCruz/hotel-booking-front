import { FlexCardComponent } from "@shared/ui/flex-card/flex-card.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";

export const BANNER: SequenceSpaceItem = {
    id: 1,  
    customClassName: [],
    component: FlexCardComponent,
    componentInput: {
        FLEX_CARD_ITEM: {
            id: 0,
            head: {
                src: 'assets/themes/web/compositions/ecommerce-blog/jewelry/luxury/home/main/static-hero/img-1.jpg',    
                alt: 'Center image',
                priority: 'critical'
            },
            body: [
                {
                    id: 0,
                    heading: {
                        id: 0,
                        headingType: 'h2',
                        text: 'Luxury Jewellery Product',
                    },
                    text: [
                        'Neque convallis a cras semper auctor. Adipiscing elit ut aliquam purus sit amet luctus. Mauris vitae ultricies leo integer. Odio facilisis mauris sit amet massa.'
                    ],
                    buttonSection: [
                        {
                            id: 0,
                            title: 'All Collection',
                            type: 'button',
                            customClassName: [],
                            iconType: {
                                type: 'none'
                            },
                        }
                    ],
                    customBlockClassName: 'static-hero'
                }
            ],
            customClassName: ['container', 'mx-[auto]', 'px-[.7rem]'],
        },
    },
}