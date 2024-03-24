import { Photo } from "./photo";

export interface Ad {
    id: number;
    userId: number;
    created: Date;
    descrition: string;
    photos: Photo[];
}