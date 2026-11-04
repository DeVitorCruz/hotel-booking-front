import { Routes } from "@angular/router";
import { Home } from "./home.page";

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: Home,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home,
    },
    {
        path: '',
        loadChildren: () => import('../BANNER_BIND_ROUTER')
            .then(m => m.BANNER_BIND_ROUTER),
    }
];