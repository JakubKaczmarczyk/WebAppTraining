import { Photo } from "./photo";

export interface Ad {
    id: number;
    photoUrl: string;
    userId: number;
    title: string;
    created: Date;
    descrition: string;
    photos: Photo[];
}