import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MedButtonComponent } from '@components/med-button/med-button.component';
import {
    Sidebar,
    SideNavComponent,
} from '@components/side-nav/side-nav.component';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-dashboard',
    imports: [RouterOutlet, SideNavComponent, MedButtonComponent],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    // Available routes
    private authService = inject(AuthService);
    private router = inject(Router);
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
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.role.set(null);
    }
}
