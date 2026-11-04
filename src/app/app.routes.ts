import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./themes/hotel/theme.config')
            .then(m => m.HOTEL_THEME_CONFIG.routes)
    }
];
