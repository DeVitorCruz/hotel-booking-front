import { FlexFormItem } from "@shared/ui/flex-form/flex-form-item.interface";
import { TextBox } from "@shared/ui/text-box/text-box-item.interface";
import { IconSwitch } from "@shared/ui/icon-flex/icon-switch.type";

export interface ContactInfoItem {
    id: number;
    icon: IconSwitch;
    label: string;
    value: string;
};

export interface ContactOpeningHours {
    day: string;
    hours: string;
};

export interface ContactMapConfig {
    iframeSrc: string;
    height?: string;
};

export interface ContactContent {
    header: TextBox[];
    infoItems: ContactInfoItem[];  
    openingHours: ContactOpeningHours[];
    map: ContactMapConfig;
    formHeader: TextBox[];
    formContent: FlexFormItem;
    successMessage?: string;
};







