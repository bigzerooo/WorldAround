import { TargetType } from "./targetType";

export class AddCommentModel {
    constructor(
        public text: string,
        public userId: number,
        public targetId: number,
        public targetType: TargetType
    ) { }
}