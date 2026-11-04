import { Type } from "@angular/core";

export interface SequenceSpaceItem {
    id: number;  
    customClassName?: string[];
    component: Type<any>;
    componentInput: Record<string, any>;
};