import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { SchemaTypes, Types } from "mongoose";

export type ProductDocument = Product & Document;


@Schema()
export class Product {

    @Prop({ required: true })
    productName: string;

    @Prop()
    price: number;

    @Prop()
    quantity: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' })
    branch: Types.ObjectId;

    @Prop()
    image: Array<string>;

    @Prop()
    size: string;

    @Prop()
    description: string;

    @Prop()
    style: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categoryID: Types.ObjectId;

    @Prop()
    color: Array<string>;

    @Prop()
    grossRating: number;


}
export const ProductSchema = SchemaFactory.createForClass(Product);
