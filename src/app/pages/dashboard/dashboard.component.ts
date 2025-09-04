import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    Sidebar,
    SideNavComponent,
} from '@components/side-nav/side-nav.component';

@Component({
    selector: 'app-dashboard',
    imports: [RouterOutlet, SideNavComponent],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    // Available routes
    adminDashboardRoutes: Sidebar[] = [
        { name: 'farmers', route: '/admin/farmers', icon: 'personal_injury' },
        { name: 'crops', route: '/admin/crops', icon: 'account_circle' },
    ];

    farmerDashboardRoutes: Sidebar[] = [
        {
            name: 'crops',
            route: '/farmer/farmer-crops',
            icon: 'personal_injury',
        },
    ];

    // Signal for role from sessionStorage
    role = signal<string | null>(sessionStorage.getItem('role'));
}
