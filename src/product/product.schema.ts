import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { SchemaTypes, Types } from "mongoose";
import { Branch } from "src/branch/branch.schema";
import { Category } from "src/category/category.schema";
import { Promotion } from "src/promotion/promotion.schema";

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
    branch: Branch;

    @Prop()
    image: Array<string>;

    @Prop()
    size: Array<string>;

    @Prop()
    description: string;

    @Prop()
    sale: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categoryID: Category;

    @Prop()
    color: Array<string>;

    @Prop()
    grossRating: number;


}
export const ProductSchema = SchemaFactory.createForClass(Product);
