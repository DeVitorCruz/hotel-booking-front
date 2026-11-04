import { Routes } from '@angular/router';

export const routes: Routes = [
    // Staff back office (browser-only, lazy; never part of the public bundle)
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./themes/hotel/theme.config')
            .then(m => m.HOTEL_THEME_CONFIG.routes)
    }
];
