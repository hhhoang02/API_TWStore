import { Types } from "mongoose";

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
    categoryID: Types.ObjectId;
    grossRating: number;
}