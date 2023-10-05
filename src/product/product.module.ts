import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

export type ProductDocument = Product & Document;


@Schema()
export class Product{
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop()
    productName: string;

    @Prop()
    price: number;

    @Prop()
    quantily: number;

    @Prop()
    branch: string;

    @Prop()
    
}