import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { ContactContent, ContactInfoItem, ContactMapConfig, ContactOpeningHours } from "@ui-building/contact/contact.interface";
import { HEADER } from "./HEADER";
import { INFO_ITEMS } from "./INFO_ITEMS";
import { OPENING_HOURS } from "./OPENING_HOURS";
import { FORM_HEADER } from "./FORM_HEADER";
import { FORM_CONTENT } from "./FORM_CONTENT";


export const CONTACT_CONTENT: ContactContent = {
    header: HEADER as TextBox[],
    infoItems: INFO_ITEMS as ContactInfoItem[],  
    openingHours: OPENING_HOURS as ContactOpeningHours[],
    map: {
        iframeSrc: '' as string,
        height: '' as string,
    } as ContactMapConfig,
    formHeader: FORM_HEADER as TextBox[],
    formContent: FORM_CONTENT as FlexFormItem,
    successMessage: 'Thank you! We will be in touch shortly.' as string,
} as ContactContent;