
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type UserDocument = Users & Document;


export class Address {
    @Prop()
    key: number;

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
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: string;

    @Prop()
    username: string;

    @Prop()
    avatar: string;

    @Prop()
    phone: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    cartID: Array<Types.ObjectId>;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    favoriteID: Array<Types.ObjectId>;

    @Prop()
    gender: string;

    @Prop()
    birthDay: string;

    @Prop()
    address: Array<Address>;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    commentID: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(Users);