
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type OrderDocument = Order & Document;


@Schema()
export class Order {
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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UsersInfo'})
    userID: Types.ObjectId;

    @Prop()
    voucher: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);