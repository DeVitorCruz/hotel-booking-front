import { Type } from "@angular/core";
import { ReviewCardComponent } from "@ui-building/review-card/review-card.component";
import { ReviewCardItem, ReviewPanelContent } from "@ui-building/review-card/review-card.interface";
import { TabItem } from "@ui-building/tab-panel/tab-panel.interface";

export const REVIEWS: TabItem = {
    id: 3 as number,
    label: 'Reviews' as string,
    component: ReviewCardComponent as Type<any>,
    componentInput: {
    CONTENT: {
        reviews: [
            {
                id: 0 as number,
                author: 'Roberto' as string,
                avatar: 'assets/collection-info/avatar-comment-01.png' as string,
                date: '02-04-2026' as string,
                rating: 5 as number,
                comment: 'This is cardigan is a comfortable warm classic piece. Great to layer with a light top and you can dress up or down given the jewel buttons. I am 1.80 128lbs a 34A and the Small fit fine.' as string,
            } as ReviewCardItem,
            {
                id: 1 as number,
                author: 'Carlitons' as string,
                avatar: 'assets/collection-info/avatar-comment-02.png' as string,
                date: '01-01-2026' as string,
                rating: 4 as number,
                comment: 'I bought this beautiful pale gray cashmere sweater for my daughter-in-law for her birthday. She loves it and can wear it with almost anything!' as string,
            } as ReviewCardItem,
            {
                id: 2 as number,
                author: 'Cesar' as string,
                avatar: 'assets/collection-info/avatar-comment-03.png' as string,
                date: '17-02-2026' as string,
                rating: 3 as number,
                comment: 'Amazing club. Sure the secruity is very tight but actually made me and my friends feel secure. You just have to go along with the secruity. Bar staff and cloakroom staff really friendly. Coming out at 7am into bright London sunshine in Smithfields is an amazing London experience' as string,
            } as ReviewCardItem,
        ] as ReviewCardItem[],
        productId: 0 as number,
    } as ReviewPanelContent,
    } as Record<string, any>,
} as TabItem;