import { SemanticSideBar } from "../semantic-side-bar.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { TAILWIND_SIDE_BAR_RIGHT } from "./tailwindCollect/TAILWIND_SIDE_BAR_RIGHT";
import { PRODUCT_LIST_SIDEBAR_ITEMS } from "./product-list-sidebar-items/PRODUCT_LIST_SIDEBAR_ITEMS";
import { BOTTOM_TEXT_BOX } from "./product-list-sidebar-items/BOTTOM_TEXT_BOX";

export const SIDE_BAR_RIGHT: SemanticSideBar = {
    id: 0,
    sideBarComponent: ContainerComponent,
    sideBarInputs: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'side-bar-right-block',
            customElementClassName: 'side-bar-right-element',
            customClassName: TAILWIND_SIDE_BAR_RIGHT,
            items: [
                PRODUCT_LIST_SIDEBAR_ITEMS as SequenceSpaceItem,
                BOTTOM_TEXT_BOX as SequenceSpaceItem,
            ],
        } as ContainerBlock,
    },
};