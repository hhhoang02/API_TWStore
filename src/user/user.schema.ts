
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type UserDocument = Users & Document
@Schema()
export class Users {
    //Các thuộc tính của product
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    rule: string;

}

export const UserSchema = SchemaFactory.createForClass(Users);