import { faPaperPlane  } from "@fortawesome/free-solid-svg-icons";
import { FlexFormField, FlexFormItem  } from "@shared/ui/flex-form/flex-form-item.interface";
import { ButtonItem } from "@shared/ui/button/button-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";
import { TAILWIND_FLEX_BUTTON } from "./tailwindCollect/TAILWIND_FLEX_BUTTON";
import { TAILWIND_FLEX_INPUT } from "./tailwindCollect/TAILWIND_FLEX_INPUT";

export const FORM_INPUT_ITEM: FlexFormItem = {
    fields: [
        {
            id: 0,
            inputItem: {
                value: '',
                placeholder: 'Email here',
                customClassName: TAILWIND_FLEX_INPUT,
                isDisabled: false,
                type: 'email',
            }
        } as FlexFormField
    ] as FlexFormField[],
    submitButton: {
        id: 1,
        type: 'button',
        customClassName: TAILWIND_FLEX_BUTTON,
        iconType: {
            type: 'iconAwesome',
            currentIcon: faPaperPlane,
        } as IconSwitch,
    } as ButtonItem,
};
