
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { Product } from "src/product/product.schema";
import { Users } from "src/user/user.schema";
export type OrderDocument = Order & Document;
export class listProduct{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productID: Product;
    @Prop()
    quantityProduct: number;

}

export class PaymentDetail {
    @Prop()
    paymentMethods: string;

    @Prop()
    status: string;

    @Prop()
    total: number;

    @Prop()
    voucher: string;

}

@Schema()
export class Order {
    @Prop()
    status: string;

    @Prop()
    listProduct:  listProduct[]; 

    @Prop()
    bookingDate: string;

    @Prop()
    deliveryDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users'})
    userID: Users;

    @Prop()
    voucher: string;

    @Prop()
    phoneReceiver: string;

    @Prop()
    nameReceiver: string;
    
    @Prop()
    payment: PaymentDetail | null;

}

export const OrderSchema = SchemaFactory.createForClass(Order);