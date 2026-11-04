import { NavBarItem } from "@shared/ui/nav-bar/nav-bar-item.interface";
import { HIDDEN_BAR_BUTTON } from "./nav-bar/HIDDEN_BAR_BUTTON";
import { LOGO_SEC } from "./nav-bar/LOGO_SEC";
import { NAV_LIST } from "./nav-bar/NAV_LIST";
import { SIDE_BAR_BUTTON } from "./nav-bar/SIDE_BAR_BUTTON";
import { TAILWIND_NAVIGATION } from "./nav-bar/tailwindCollect/TAILWIND_NAVIGATION";
import { SemanticHomeNavBar } from "./semantic-home-nav-bar.interface";

export const NAV_BAR: SemanticHomeNavBar = {
    navBar: {
        customClassName: TAILWIND_NAVIGATION,
        navBarSecList: [
            HIDDEN_BAR_BUTTON,
            LOGO_SEC,
            NAV_LIST,
            SIDE_BAR_BUTTON
        ]
    } as NavBarItem,
};