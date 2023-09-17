
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = Users & Document
@Schema()
export class Users{
    //Các thuộc tính của product
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

}

export const UserSchema = SchemaFactory.createForClass(Users);