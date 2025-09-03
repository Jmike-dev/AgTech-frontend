import { Farmer } from './crop.modal';

export interface Admin {
    adminId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    created_At: Date;
    refreshToken?: string | null;
    farmers?: Farmer[]; // Relation
}
