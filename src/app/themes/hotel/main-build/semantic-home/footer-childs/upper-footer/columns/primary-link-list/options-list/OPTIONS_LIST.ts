import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const OPTIONS_LIST: Extandable[] = [
    {   
        id: 0,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: '',
            rlink: '/rooms',
            title: 'Rooms',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
    {
        id: 1,
        type: 'rlink',
        anchorItem: {
            id: 1,
            ariaLabel: '',
            rlink: '/about',
            title: 'About Us',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
    {
        id: 2,
        type: 'rlink',
        anchorItem: {
            id: 2,
            ariaLabel: '',
            rlink: '/team',
            title: 'Our Team',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
    {
        id: 3,
        type: 'rlink',
        anchorItem: {
            id: 3,
            ariaLabel: '',
            rlink: '/blog',
            title: 'Journal',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
    {
        id: 4,
        type: 'rlink',
        anchorItem: {
            id: 4,
            ariaLabel: '',
            rlink: '/contact',
            title: 'Contact Us',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
];

