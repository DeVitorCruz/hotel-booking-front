import { faClock, faEnvelope, faLocationDot, faPhone, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { ContactInfoItem } from "@ui-building/contact/contact.interface";

export const INFO_ITEMS: ContactInfoItem[] = [
    {
        id: 0 as number,
        icon: {
            type: 'iconAwesome',
            currentIcon: faLocationDot as IconDefinition,
        } as IconSwitch,
        label: 'Address' as string,
        value: '123 Jewelry Street, Rio de Janeiro, Brazil' as string,
    } as ContactInfoItem,
    {
        id: 1 as number,
        icon: {
            type: 'iconAwesome',
            currentIcon: faPhone as IconDefinition,
        } as IconSwitch,
        label: 'Phone' as string,
        value: '+55 (21) 99999-9999' as string,
    } as ContactInfoItem,
    {
        id: 2 as number,
        icon: {
            type: 'iconAwesome',
            currentIcon: faEnvelope as IconDefinition,
        } as IconSwitch,
        label: 'Email' as string,
        value: 'contact@datentria.com' as string,
    } as ContactInfoItem,
    {
        id: 3 as number,
        icon: {
            type: 'iconAwesome',
            currentIcon: faClock as IconDefinition,
        } as IconSwitch,
        label: 'Hours' as string,
        value: 'Mon - Sat: 9am - 6pm' as string,
    } as ContactInfoItem,
];