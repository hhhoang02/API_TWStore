
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type AddressDocument = Address & Document
@Schema()
export class Address {
    //Các thuộc tính của product
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId
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

export const AddressSchema = SchemaFactory.createForClass(Address);