import mongoose, { Types } from "mongoose";
import { Product } from "src/product/product.schema";

export class UserCart_FavoriteDTO {
    _idUser: Types.ObjectId;
    _idProduct: Product;
}