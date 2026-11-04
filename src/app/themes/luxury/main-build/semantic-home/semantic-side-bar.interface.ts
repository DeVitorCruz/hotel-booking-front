import { Type } from "@angular/core";

export interface SemanticSideBar {
    id: number;
    sideBarComponent: Type<any>;
    sideBarInputs: Record<string, any>;
};