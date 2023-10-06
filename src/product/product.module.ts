import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { SchemaTypes, Types } from "mongoose";

export type ProductDocument = Product & Document;


@Schema()
export class Product {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop()
    productName: string;

    @Prop()
    price: number;

    @Prop()
    quantity: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    branch: Types.ObjectId;

    @Prop()
    image: Array<string>;

    @Prop()
    size: string | number;

    @Prop()
    description: string;

    @Prop()
    style: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categoryID: Array<Types.ObjectId>;

    @Prop()
    color: Array<string>;

    @Prop()
    grossRating: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    comment: Array<Types.ObjectId>;

}