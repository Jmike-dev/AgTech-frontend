import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Admin } from '@models/admin.modal';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    constructor() {}
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);

    getAdminById(adminId: string) {
        return this.http.get<Admin>(`${this.apiUrl}/admin/${adminId}`);
    }
    editAdmin(adminId: string, admin: Admin) {
        return this.http.patch<Admin>(`${this.apiUrl}/admin/${adminId}`, admin);
    }
    createAdmin(adminId: string, admin: Admin) {
        return this.http.post<Admin>(`${this.apiUrl}/admin/${adminId}`, admin);
    }
}
