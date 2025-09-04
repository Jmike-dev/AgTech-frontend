import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs/operators';

interface LoginData {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);

    constructor() {}

    adminLogin(adminCredentials: LoginData) {
        return this.http
            .post<any>(`${this.apiUrl}/auth/login/admin`, adminCredentials)
            .pipe(
                tap((response) => {
                    if (response?.role) {
                        sessionStorage.setItem('role', response.role);
                    }
                }),
            );
    }

    farmerLogin(farmerCredentials: LoginData) {
        return this.http
            .post<any>(`${this.apiUrl}/auth/login/farmer`, farmerCredentials)
            .pipe(
                tap((response) => {
                    if (response?.role) {
                        sessionStorage.setItem('role', response.role);
                    }
                }),
            );
    }

    logout() {
        sessionStorage.removeItem('role');
    }

    getRole() {
        return sessionStorage.getItem('role');
    }
}
