import { NavBarSecItem } from "@shared/ui/nav-bar/nav-bar-sec-item.interface";
import { AnchorFlex } from "@shared/ui/anchor-flex/anchor-flex.component";

export const LOGO_SEC: NavBarSecItem = {
    id: 0,
    classSection: 'logo',
    componentSection: AnchorFlex, 
    componentInput: {
        ANCHOR_FLEX_ITEM: {
            id: 0,
            ariaLabel: 'Logo',
            rlink: '/',
            switchAbleIcon: {
                type: 'none'
            },
            imageFlex: {
                src: 'assets/collection-info/logo.svg',
                alt: 'logo',
            },
        }
    }
};