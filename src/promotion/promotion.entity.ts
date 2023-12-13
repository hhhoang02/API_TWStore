import { Product } from "src/product/product.schema";

export class Promotion{
    titleVoucher: string;
    contentVoucher: string;
    discountCode : string;
    discountLevel : number;
    startDay: string;
    endDay: string;
}