
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type UserDocument = Users & Document;



@Schema()
export class Users {

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    role: string;

    @Prop()
    phone: string;


}

export const UserSchema = SchemaFactory.createForClass(Users);