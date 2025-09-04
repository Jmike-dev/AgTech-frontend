import { Component } from '@angular/core';
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
}
