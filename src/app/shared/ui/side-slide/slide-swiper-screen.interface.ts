import { Type } from "@angular/core";

export interface SlideSwiperScreen {
    id: number;
    swiperComponent: Type<any>;
    swiperInput: Record<string, any>;
};