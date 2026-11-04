import { ThemeContent } from "./theme.content.type";
import { ThemeStyles } from "./theme.styles.type";
import { Routes } from '@angular/router';

export interface ThemeConfig {
    id: string;
    name: string;
    category?: string;
    variant?: string;
    routes: Routes;
    rootClassName?: string;
    styles?: ThemeStyles;
    content?: ThemeContent;
};