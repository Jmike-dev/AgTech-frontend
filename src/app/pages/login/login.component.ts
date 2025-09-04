import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { toast } from 'ngx-sonner';
import { MedButtonComponent } from '@components/med-button/med-button.component';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MedButtonComponent,
    ],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    loading = signal(false);
    hidePassword = signal(true);

    // NEW → track mode (default ADMIN)
    loginMode = signal<'ADMIN' | 'FARMER'>('ADMIN');

    toggleMode = () => {
        this.loginMode.update((mode) =>
            mode === 'ADMIN' ? 'FARMER' : 'ADMIN',
        );
    };

    handleLogin = () => {
        const data = {
            email: this.loginForm.value.email ?? '',
            password: this.loginForm.value.password ?? '',
        };

        if (!data.email || !data.password) {
            toast.warning('🤨 Email and password are required');
            return;
        }

        this.loading.set(true);

        const login$ =
            this.loginMode() === 'ADMIN'
                ? this.authService.adminLogin(data)
                : this.authService.farmerLogin(data);

        login$.subscribe({
            next: () => {
                this.loading.set(false);
                toast.success(
                    this.loginMode() === 'ADMIN'
                        ? '✅ Admin login successful'
                        : '✅ Farmer login successful',
                );
                this.router.navigateByUrl(
                    this.loginMode() === 'ADMIN'
                        ? '/dashboard/admin'
                        : '/dashboard/farmer',
                );
            },
            error: (error) => {
                this.loading.set(false);
                toast.error('❌ Login failed: ' + error?.error?.message);
            },
        });
    };

    handleSignUp = () => {
        this.router.navigateByUrl('/signup');
    };
}
