import { SemanticSideBar } from "../semantic-side-bar.interface";
import { ContainerComponent } from "@shared/ui/container/container.component";
import { SequenceSpaceItem } from "@shared/ui/sequence-space/sequence-space-item";
import { TAILWIND_SIDE_BAR_LEFT } from "./tailwindCollect/TAILWIND_SIDE_BAR_LEFT";
import { TAILWIND_SEQUENCE_SPACE_LEFT_ITEM } from "./tailwindCollect/TAILWIND_SEQUENCE_SPACE_LEFT_ITEM";
import { TAILWIND_NAV_BAR_LIST } from "./tailwindCollect/TAILWIND_NAV_BAR_LIST";
import { NavBar } from "@shared/ui/nav-bar/nav-bar.component";
import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { ContainerBlock } from "@shared/ui/container/container-block.interface";
import { SIDE_NAV_LIST } from "./SIDE_NAV_LIST";


export const SIDE_BAR_LEFT: SemanticSideBar = {
    id: 0,
    sideBarComponent: ContainerComponent,
    sideBarInputs: {
        BLOCK_SEQUENCE_SPACE: {
            id: 0,
            customBlockClassName: 'side-bar-left-block',
            customElementClassName: 'side-bar-left-element',
            customClassName: TAILWIND_SIDE_BAR_LEFT,
            items: [
                {
                    id: 0,  
                    customClassName: TAILWIND_SEQUENCE_SPACE_LEFT_ITEM,
                    component: NavBar,
                    componentInput: {
                        NAV_BAR_ITEM: {
                            customClassName: TAILWIND_NAV_BAR_LIST,
                            navBarSecList: [SIDE_NAV_LIST as NavBarSecItem],
                        }
                    },
                } as SequenceSpaceItem,
            ],
        } as ContainerBlock,
    },
};