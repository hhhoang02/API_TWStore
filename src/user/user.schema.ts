
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

@Schema()
export class Users {

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    _idUser: Types.ObjectId;

    @Prop()
    avatar: string;


    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }])
    cartID: Product[];


    @Prop()
    gender: string;

    @Prop()
    birthDay: string;

    @Prop()
    address: Address[];

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
    commentID: Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(Users);