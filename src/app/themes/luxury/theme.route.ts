import { Routes } from "@angular/router";


export const JEWELRY_LUXURY_THEME_ROUTE: Routes = [
    {
        path: '',
        loadComponent: () => import('./main-build/semantic-home/semantic-home.page')
			.then(m => m.SemanticHome), 
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/home/HOME_ROUTES')
					.then((m) => m.HOME_ROUTES),
            }
        ],   
    },
    {
        path: 'auth',
        loadComponent: () => import('./main-build/auth-shell/auth-shell.page')
            .then(m => m.AuthShellPage),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.page')
                    .then(m => m.LoginPage)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.page')
                    .then(m => m.RegisterPage)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'error-404'
    }
];
