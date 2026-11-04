import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { SequenceSpaceComponent } from "@shared/ui/sequence-space/sequence-space.component";
import { TAILWIND_CONTENT_LIST } from "./tailwindCollect/TAILWIND_CONTENT_LIST";
import { TAILWIND_INNER_LIST } from "./tailwindCollect/TAILWIND_INNER_LIST";
import { LIST_ITEMS_PRODUCT } from "./LIST_ITEMS_PRODUCT";

export const PRODUCT_LIST_SIDEBAR_ITEMS: SequenceSpaceItem = {
    id: 0,  
    customClassName: TAILWIND_CONTENT_LIST,
    component: SequenceSpaceComponent,
    componentInput: {
        SEQUENCE_SPACE_LIST: LIST_ITEMS_PRODUCT as SequenceSpaceItem[],
        COSTUME_CLASS_ELEMENT: 'product-list-sidebar-element-items',
        COSTUME_CLASS_BLOCK_NAME: 'product-list-sidebar-block-items',
        COSTUME_CLASS_NAME_LIST: TAILWIND_INNER_LIST as string[],
    },
};
