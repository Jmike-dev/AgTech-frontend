import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, tap } from 'rxjs';
import { Crop } from '@models/crops.modal';

@Injectable({
    providedIn: 'root',
})
export class CropsService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    private cropsListSubject = new BehaviorSubject<Crop[]>([]);

    constructor() {}
    createCrop(crop: Crop) {
        return this.http.post<Crop>(`${this.apiUrl}/crops`, crop);
    }
    editCrops(cropId: string, crop: Crop) {
        return this.http.patch<Crop>(`${this.apiUrl}/crops/${cropId}`, crop);
    }
    getCrops(farmerId: string) {
        return this.http
            .get<Crop[]>(`${this.apiUrl}/crops/farmer${farmerId}`)
            .pipe(tap((crops) => this.cropsListSubject.next(crops)));
    }
}
