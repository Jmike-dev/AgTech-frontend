import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Farmer } from '@models/crop.modal';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class FarmersService {
    private apiUrl = environment.apiUrl;
    private http = inject(HttpClient);
    private farmerListSubject = new BehaviorSubject<Farmer[]>([]);

    constructor() {}
    createFarmer(farmer: Farmer) {
        return this.http.post<Farmer>(`${this.apiUrl}/farmer`, farmer);
    }
    getAFarmer(farmerId: string) {
        return this.http.get<Farmer>(`${this.apiUrl}/farmer/${farmerId}`);
    }
    getAllFarmers(adminId: string) {
        return this.http
            .get<Farmer[]>(`${this.apiUrl}/farmer/admin/${adminId}`)
            .pipe(tap((farmers) => this.farmerListSubject.next(farmers)));
    }
    editFarmer(farmerId: string, farmer: Farmer) {
        return this.http.patch<Farmer>(
            `${this.apiUrl}/farmer/${farmerId}`,
            farmer,
        );
    }
}
