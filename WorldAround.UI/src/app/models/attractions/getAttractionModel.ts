import { CommentModel } from "../comments/comment";

export class GetAttractionModel {
    id: number;
    authorId:number;

    name: string;
    description: string;

    latitude:number;
    longitude:number

    imagePath:string;

    comments: CommentModel[];
}