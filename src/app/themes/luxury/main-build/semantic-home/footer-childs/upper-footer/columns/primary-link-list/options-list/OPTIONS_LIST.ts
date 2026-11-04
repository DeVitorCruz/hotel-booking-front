import { Extandable } from "@shared/ui/custom-list/expandable.type";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const OPTIONS_LIST: Extandable[] = [
    {   
        id: 0,
        type: 'rlink',
        anchorItem: {
            id: 0,
            ariaLabel: '',
            rlink: '',
            title: 'Contact Us',
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
            rlink: '',
            title: 'How It Works',
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
            rlink: '',
            title: 'Create',
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
            rlink: '',
            title: 'Explore',
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
            rlink: '',
            title: 'Terms & Services',
            switchAbleIcon: {
                type: 'iconAwesome',
                currentIcon: faAngleRight,
            },
        },
    },
];

