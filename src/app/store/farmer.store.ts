import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { FarmersService } from '@services/farmers.service';
import { Farmer } from '@models/farmers.modal';

interface FarmersState {
    loadingFarmers: boolean;
    error: string | null;
    farmers: Farmer[];
    farmer: Farmer | null;
    newFarmer: Farmer | null;
}

const initialState: FarmersState = {
    loadingFarmers: false,
    error: null,
    farmers: [],
    farmer: null,
    newFarmer: null,
};

export const FarmersStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, farmersService = inject(FarmersService)) => ({
        async fetchAllFarmers(adminId: string) {
            patchState(store, { loadingFarmers: true });
            try {
                const farmers = await firstValueFrom(
                    farmersService.getAllFarmers(adminId),
                );
                patchState(store, { farmers, loadingFarmers: false });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to fetch farmers',
                    loadingFarmers: false,
                });
            }
        },

        async fetchFarmer(farmerId: string) {
            patchState(store, { loadingFarmers: true });
            try {
                const farmer = await firstValueFrom(
                    farmersService.getAFarmer(farmerId),
                );
                patchState(store, { farmer, loadingFarmers: false });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to fetch farmer',
                    loadingFarmers: false,
                });
            }
        },

        async createFarmer(data: Farmer) {
            patchState(store, { loadingFarmers: true });
            try {
                const farmer = await firstValueFrom(
                    farmersService.createFarmer(data),
                );
                patchState(store, {
                    newFarmer: farmer,
                    farmers: [...store.farmers(), farmer],
                    loadingFarmers: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to create farmer',
                    loadingFarmers: false,
                });
            }
        },

        async editFarmer(farmerId: string, farmer: Farmer) {
            patchState(store, { loadingFarmers: true });
            try {
                const updated = await firstValueFrom(
                    farmersService.editFarmer(farmerId, farmer),
                );
                const updatedFarmers = store
                    .farmers()
                    .map((f) =>
                        f.farmerId === updated.farmerId ? updated : f,
                    );

                patchState(store, {
                    farmer: updated,
                    farmers: updatedFarmers,
                    loadingFarmers: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to update farmer',
                    loadingFarmers: false,
                });
            }
        },
    })),
);
