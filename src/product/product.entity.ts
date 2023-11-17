import { Types } from "mongoose";
import { Branch } from "src/branch/branch.schema";
import { Category } from "src/category/category.schema";

export class Product {
    productName: string;
    price: number;
    quantity: number;
    branch: Branch;
    image: Array<string>;
    size: Array<string>;
    description: string;
    sale: number;
    color: Array<string>;
    categoryID: Category;
    grossRating: number;
}