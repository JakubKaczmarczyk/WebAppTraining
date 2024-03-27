import { Photo } from "./photo";

export interface Ad {
    id: number;
    photoUrl: string;
    userId: number;
    created: Date;
    descrition: string;
    photos: Photo[];
}