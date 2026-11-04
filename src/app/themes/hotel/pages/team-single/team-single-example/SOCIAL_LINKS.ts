import { IconDefinition } from "@fortawesome/angular-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export const SOCIAL_LINKS: AnchorFlexItem[] = [
    {
        id: 0 as number,
        title: '' as string,
        ariaLabel: 'LinkedIn' as string,
        rlink: '#' as string,
        switchAbleIcon: {
            type: 'iconAwesome',
            currentIcon: faLinkedin as IconDefinition,
        } as IconSwitch,
    } as AnchorFlexItem,
    {
        id: 1 as number,
        title: '' as string,
        ariaLabel: 'Twitter' as string,
        rlink: '#' as string,
        switchAbleIcon: {
            type: 'iconAwesome',
            currentIcon: faTwitter as IconDefinition,
        } as IconSwitch,
    } as AnchorFlexItem,
    {
        id: 2 as number,
        title: '' as string,
        ariaLabel: 'Facebook' as string,
        rlink: '#' as string,
        switchAbleIcon: {
            type: 'iconAwesome',
            currentIcon: faFacebook as IconDefinition,
        } as IconSwitch,
    } as AnchorFlexItem,
    {
        id: 3 as number,
        title: '' as string,
        ariaLabel: 'Instagram' as string,
        rlink: '#' as string,
        switchAbleIcon: {
            type: 'iconAwesome',
            currentIcon: faInstagram as IconDefinition,
        } as IconSwitch,
    } as AnchorFlexItem,
] as AnchorFlexItem[];