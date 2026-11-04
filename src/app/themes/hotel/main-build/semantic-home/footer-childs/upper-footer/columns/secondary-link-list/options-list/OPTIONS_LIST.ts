import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const OPTIONS_LIST: Extandable[] = [
    {   
        id: 0,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: '',
            rlink: '/faq',
            title: 'FAQ',
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
            rlink: '/rooms',
            title: 'Check availability',
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
            rlink: '/faq',
            title: 'Cancellation policy',
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
            rlink: '/contact',
            title: 'Getting here',
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
            rlink: '/auth/login',
            title: 'Sign in',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
];

