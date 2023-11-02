import { Types } from "mongoose";
import { Address } from "./user.schema";
import { Product } from "src/product/product.schema";

export class Users {
    _id: Types.ObjectId;
    _idUser: Types.ObjectId;
    avatar: string;
    cartID: Product[];
    favoriteID: Product[];
    gender: string;
    birthDay: string;
    address: Array<Address>;
    commentID: Types.ObjectId;
}
