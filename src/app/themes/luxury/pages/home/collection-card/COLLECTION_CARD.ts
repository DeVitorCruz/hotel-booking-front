import { FlexCollectionItem } from "@shared/ui/flex-collection/flex-collection-item.interface";
import { HEADER_COLLECTION } from "./HEADER_COLLECTION";
import { BODY_COLLECTION_LIST } from "./BODY_COLLECTION_LIST";

export const COLLECTION_CARD: FlexCollectionItem = {
    header: HEADER_COLLECTION,
    customClassName: [
        'container',
        'mx-[auto]',
        'px-[.7rem]'
    ],
    customBlockClassName: 'collection-card',
    bodyList: BODY_COLLECTION_LIST,
    bodyBlockClassName: 'collection-body-card',
    bodyElementClassName: '',  
};