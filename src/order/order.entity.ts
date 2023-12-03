import { PaymentDetail, listProduct } from './order.schema';
import { Product } from "src/product/product.schema";
import { Promotion } from "src/promotion/promotion.schema";
import { Users } from 'src/user/user.schema';
import { UsersInfo } from "src/userInfo/user.schema";

export class Order {
    orderCode: string;

    status: number;

    listProduct: listProduct[];

    bookingDate: string;

    deliveryDate: string;

    userID: Users;

    voucher: string;

    phoneReceiver: string;

    nameReceiver: string;

    addressDelivery: string;

    payment: PaymentDetail;

    totalPrice: number;
}