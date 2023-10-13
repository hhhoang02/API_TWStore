import { Types } from "mongoose";
import { Address } from "./user.schema";

export class Users {
    email: string;
    password: string;
    username: string;
    avatar: string ;
    phone: string;
    role: string;
    cartID: Array<Types.ObjectId>;
    favoriteID: Array<Types.ObjectId>;
    gender: string;
    birthDay: string;
    address: Array<Address>;
    commentID: Types.ObjectId;
}
