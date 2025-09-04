import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { firstValueFrom } from 'rxjs';
import { CropsService } from '@services/crops.service';
import { Crop } from '@models/crops.modal';

interface CropsState {
    loadingCrops: boolean;
    error: string | null;
    crops: Crop[];
    crop: Crop | null;
    newCrop: Crop | null;
}

const initialState: CropsState = {
    loadingCrops: false,
    error: null,
    crops: [],
    crop: null,
    newCrop: null,
};

export const CropsStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, cropsService = inject(CropsService)) => ({
        async fetchCrops(farmerId: string) {
            patchState(store, { loadingCrops: true });
            try {
                const crops = await firstValueFrom(
                    cropsService.getCrops(farmerId),
                );
                patchState(store, { crops, loadingCrops: false });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to fetch crops',
                    loadingCrops: false,
                });
            }
        },
        async fetchAllCropsAdmin(adminId: string) {
            patchState(store, { loadingCrops: true });
            try {
                const crops = await firstValueFrom(
                    cropsService.allCrops(adminId),
                );
                patchState(store, { crops, loadingCrops: false });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to fetch crops',
                    loadingCrops: false,
                });
            }
        },
        async createCrop(data: Crop) {
            patchState(store, { loadingCrops: true });
            try {
                const crop = await firstValueFrom(
                    cropsService.createCrop(data),
                );
                patchState(store, {
                    newCrop: crop,
                    crops: [...store.crops(), crop],
                    loadingCrops: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to create crop',
                    loadingCrops: false,
                });
            }
        },

        async editCrop(cropId: string, crop: Crop) {
            patchState(store, { loadingCrops: true });
            try {
                const updated = await firstValueFrom(
                    cropsService.editCrops(cropId, crop),
                );
                const updatedCrops = store
                    .crops()
                    .map((c) => (c.cropId === updated.cropId ? updated : c));

                patchState(store, {
                    crop: updated,
                    crops: updatedCrops,
                    loadingCrops: false,
                });
            } catch (err: any) {
                patchState(store, {
                    error: err.error?.message || 'Failed to update crop',
                    loadingCrops: false,
                });
            }
        },
    })),
);
