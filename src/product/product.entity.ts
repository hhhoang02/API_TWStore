import { Types } from "mongoose";
import { Brand } from "src/brand/Brand.schema";
import { Category } from "src/category/category.schema";
import { Color } from "src/colorProduct/color.schema";

export class Product {
    image: Array<string>;
    productName: string;
    price: number;
    quantity: number;
    brand: Brand;
    size: Array<string>;
    description: string;
    sale: number;
    colorID: Color;
    categoryID: Category;
}