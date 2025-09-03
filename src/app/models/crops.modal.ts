import { Farmer } from './farmers.modal';

export interface Crop {
    cropId: string;
    name: string;
    number: number;
    farmerId: string;
    farmer?: Farmer;
}
