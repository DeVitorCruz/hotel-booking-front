import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { RLink } from "@shared/ui/custom-list/r-link.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const FOOTER_LIST_ITEMS: Extandable[] = [
    {
        id: 0,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: 'facebook',
            rlink: '#',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faFacebook as IconDefinition,
            } as IconSwitch,
        } as AnchorFlexItem,
    } as RLink,
    {
        id: 1,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: 'twitter',
            rlink: '#',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faTwitter as IconDefinition,
            } as IconSwitch,
        } as AnchorFlexItem,
    } as RLink,
    {
        id: 2,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: 'linkedin',
            rlink: '#',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faLinkedin as IconDefinition,
            } as IconSwitch,
        } as AnchorFlexItem,
    } as RLink,
];