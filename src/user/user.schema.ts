
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type UserDocument = Users & Document;



export class AddressInter {
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
export class History {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productID: Types.ObjectId;

    @Prop()
    status: boolean;
}
@Schema()
export class Users {
    //Các thuộc tính của product
    @Prop()
    username: string;

    @Prop()
    avatar: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    phone: string;

    @Prop()
    role: string;


    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    // addressID: Types.ObjectId;
    @Prop()
    address: Array<AddressInter>;
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    // cartID: Types.ObjectId;


    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    // favoriteID: Types.ObjectId;

    @Prop()
    history: Array<History>;


    @Prop()
    gender: string;

    @Prop()
    birthday: Date;

    @Prop()
    createAt: Date;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    // orderID: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(Users);