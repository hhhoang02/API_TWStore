
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type OrderDocument = Order & Document;


export class PaymentDetail {
    @Prop()
    paymentMethods: string;
    status: string;

    @Prop()
    total: number;
    voucher: string;
    phoneReceiver: string;
    nameReceover: string;
}

@Schema()
export class Order {
    //Các thuộc tính của product
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId
    @Prop()
    status: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productID: Types.ObjectId;

    @Prop()
    quantity: number;

    @Prop()
    bookingDate: string;

    @Prop()
    deliveryDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address', unique: true })
    addressID: Types.ObjectId;

    @Prop()
    payment: PaymentDetail;

    @Prop()
    voucher: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);