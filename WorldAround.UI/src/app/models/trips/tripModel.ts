import { CommentModel } from "../comments/comment";
import { PinModel } from "./pin";

export class TripModel {
    id: number;
    authorId: number;
    name: string;
    description: string;
    pins: PinModel[];
    comments: CommentModel[];
    createDate: string;
}