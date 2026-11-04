import { AnchorFlexItem } from "@shared/ui/anchor-flex/anchor-flex-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { FOOTER_HEADING } from "@themes/luxury/main-build/auth-shell/right-content/FOOTER_HEADING";
import { FOOTER_LIST_ITEMS } from "@themes/luxury/main-build/auth-shell/right-content/FOOTER_LIST_ITEMS";

export const LOGIN_FOOTER_CONTENT: TextBox[] = [
    {
        id: 0,
        heading: FOOTER_HEADING,
        list: FOOTER_LIST_ITEMS,
        text: ["Don't have an account?"],
        anchorLink: [
            {
                id: 0,
                title: 'Create free account',
                ariaLabel: 'Register',
                rlink: '/auth/register',
                switchAbleIcon: {
                    type: 'none'
                } as IconSwitch,
            }
        ] as AnchorFlexItem[],
    }
];