import { Type } from "@angular/core";

export interface NavBarSecItem {
    id: number;
    classSection: string;
    componentSection: Type<any>;
    componentInput: Record<string, any>;
};