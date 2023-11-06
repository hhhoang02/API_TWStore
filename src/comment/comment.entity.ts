import { Types } from "mongoose";

export class Comment {
    userID: Array<Types.ObjectId>;
    productID: Array<Types.ObjectId>;
    createAt: string;
    content: string;
    star: number;
}