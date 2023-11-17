import { Product } from "src/product/product.schema";
import { Promotion } from "src/promotion/promotion.schema";
import { UsersInfo } from "src/userInfo/user.schema";

export class Order{
  
    status: string;

    productID: Product; 

    quantity: number;

    bookingDate: string;

    deliveryDate: string;

    userID: UsersInfo;

    promotionID: Promotion;
}