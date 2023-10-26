import mongoose, { Types } from "mongoose";

export class UserCart_FavoriteDTO {
    emailUser: string;
    _idProduct: Types.ObjectId;
}