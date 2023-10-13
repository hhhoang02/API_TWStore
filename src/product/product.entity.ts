import { Types } from "mongoose";
import { Users } from "src/user/user.entity";

export class Product {
    productName: string;
    price: number;
    quantity: number;
    branch: Types.ObjectId;
    image: Array<string>;
    size: string
    description: string;
    style: string;
    color: Array<string>;
    category: Types.ObjectId;
    grossRating: number;
    comment: Array<Types.ObjectId>;
}