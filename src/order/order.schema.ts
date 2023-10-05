
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
     
    @Prop()
    quantity: number;

    @Prop()
    price: Array<Product>;

    @Prop()
    bookingDate: string;

    @Prop()
    deliveryDate: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address', unique : true })
    addressID: Types.ObjectId;

    @Prop()
    payment: PaymentDetail;

}

export const OrderSchema = SchemaFactory.createForClass(Order);