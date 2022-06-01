import { CommentModel } from "../comments/comment";
import { PinModel } from "./pin";

export class GetTripsModel {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public pins: PinModel[],
        public comments: CommentModel[],
        public createDate: string
    ) { }
}