import mongoose, { Types } from "mongoose";

export class UserCart_FavoriteDTO {
    _idUser: Types.ObjectId;
    _idProduct: Types.ObjectId;
}