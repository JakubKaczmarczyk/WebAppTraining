import { Photo } from "./photo";
import { Comment } from "./comment";

export interface Ad {
    id: number;
    photoUrl: string;
    userId: number;
    title: string;
    created: Date;
    description: string;
    street: string;
    homeNr: string;
    phoneNr: string;
    photos: Photo[];
    comments: Comment[];
}