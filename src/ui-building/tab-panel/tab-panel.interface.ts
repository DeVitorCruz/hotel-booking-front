import { Type } from '@angular/core';

export interface TabItem {
    id: number;
    label: string;
    component: Type<any>;
    componentInput: Record<string, any>;
};

export interface TabPanelContent {
    tabs: TabItem[];
    customClassName?: string[];
};