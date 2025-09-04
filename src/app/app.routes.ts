import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { SignupComponent } from '@pages/signup/signup.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('@pages/dashboard/dashboard.component').then(
                (c) => c.DashboardComponent,
            ),
        children: [
            {
                path: 'admin',
                loadComponent: () =>
                    import('@pages/admin/admin.component').then(
                        (c) => c.AdminComponent,
                    ),
                children: [
                    {
                        path: 'farmers',
                        loadComponent: () =>
                            import('@pages/farmers/farmers.component').then(
                                (c) => c.FarmersComponent,
                            ),
                    },
                    {
                        path: 'crops',
                        loadComponent: () =>
                            import('@pages/crops/crops.component').then(
                                (c) => c.CropsComponent,
                            ),
                    },
                ],
            },
            {
                path: 'farmer',
                loadComponent: () =>
                    import('@pages/farmer/farmer.component').then(
                        (c) => c.FarmerComponent,
                    ),
                children: [
                    {
                        path: 'farmer-crops',
                        loadComponent: () =>
                            import(
                                '@pages/farmer/farmer-crops/farmer-crops.component'
                            ).then((c) => c.FarmerCropsComponent),
                    },
                ],
            },
        ],
    },
];
