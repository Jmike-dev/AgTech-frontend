import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { AdminService } from '@services/admin.service';
import { Admin } from '@models/admin.modal';

interface AdminState {
    loadingAdmin: boolean;
    error: string | null;
    admin: Admin | null;
    newAdmin: Admin | null;
}

const initialState: AdminState = {
    loadingAdmin: false,
    error: null,
    admin: null,
    newAdmin: null,
};

export const AdminStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, adminService = inject(AdminService)) => ({
        async fetchAdmin(adminId: string) {
            patchState(store, { loadingAdmin: true });
            try {
                const admin = await firstValueFrom(
                    adminService.getAdminById(adminId),
                );
                patchState(store, { admin, loadingAdmin: false });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to fetch admin',
                    loadingAdmin: false,
                });
            }
        },

        async createAdmin(adminId: string, data: Admin) {
            patchState(store, { loadingAdmin: true });
            try {
                const admin = await firstValueFrom(
                    adminService.createAdmin(adminId, data),
                );
                patchState(store, {
                    newAdmin: admin,
                    admin,
                    loadingAdmin: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to create admin',
                    loadingAdmin: false,
                });
            }
        },

        async editAdmin(adminId: string, data: Admin) {
            patchState(store, { loadingAdmin: true });
            try {
                const updated = await firstValueFrom(
                    adminService.editAdmin(adminId, data),
                );
                patchState(store, {
                    admin: updated,
                    loadingAdmin: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to update admin',
                    loadingAdmin: false,
                });
            }
        },
    })),
);
