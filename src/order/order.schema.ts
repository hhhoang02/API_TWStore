
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { Color } from "src/colorProduct/color.schema";
import { Product } from "src/product/product.schema";
import { Promotion } from "src/promotion/promotion.schema";
import { Size } from "src/size/size.schema";
import { Users } from "src/user/user.schema";
export type OrderDocument = Order & Document;


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
export class listProduct{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productID: Product;

    @Prop()
    quantityProduct: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Color' })
    colorID: Color;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Size' })
    sizeID: Size;

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Promotion'})
    promotionID: Promotion;

    @Prop()
    voucher: string;

    @Prop()
    phoneReceiver: string;

    @Prop()
    nameReceiver: string;

    @Prop()
    addressDelivery: string;
    
    @Prop()
    payment: PaymentDetail | null;

}

export const OrderSchema = SchemaFactory.createForClass(Order);