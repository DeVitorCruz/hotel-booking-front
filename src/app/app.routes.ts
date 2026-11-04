import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'simple-page', 
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/main-build/sp-home/sp-home.page')
                    .then(m => m.SpHome)
            }
        ]
    },
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./themes/luxury/theme.config')
                    .then(m => m.JEWELRY_LUXURY_THEME_CONFIG.routes)
            }
        ]
    },
    {
        path: 'fashion-clothes',
        children: [
            {
                path: '',
                loadChildren: () => import('./themes/fashion-clothes/theme.config')
                    .then(m => m.FASHION_CLOTHES_THEME_CONFIG.routes)
            } 
        ]
    }
];
