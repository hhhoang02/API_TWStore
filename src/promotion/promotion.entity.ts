import { Product } from "src/product/product.schema";

export class Promotion{
    discountCode : string;
    discountLevel : number;
    startDay: string;
    endDay: string;
}