import { Admin } from './admin.modal';
import { Crop } from './farmer.modal';

export interface Farmer {
    farmerId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    refreshToken?: string | null;
    adminId: string;
    admin?: Admin;
    crops?: Crop[];
}
