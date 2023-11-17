
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
import { Product } from "src/product/product.schema";
export type UserDocument = Users & Document;


export class Address {
    @Prop()
    position: number;

    @Prop()
    city: string;

    @Prop()
    district: string;

    @Prop()
    ward: string;

    @Prop()
    street: string;

    @Prop()
    phone: string;
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

    @Prop()
    phoneReceiver: string;
    
    @Prop()
    nameReceiver: string;
}
@Schema()
export class Users {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;

    @Prop()
    avatar: string;


    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } })
    cartID: Product[];

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } })
    favoriteID: Product[];

    @Prop()
    gender: string;

    @Prop()
    birthDay: string;

    @Prop()
    address: Address[];

    @Prop()
    payment: PaymentDetail[];
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    commentID: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(Users);