import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/product/product.schema";

export type PromotionDocument = Promotion & Document;


@Schema()
export class Promotion {

    @Prop()
    discountCode : string;

    @Prop()
    discountLevel : number;

    @Prop()
    startDay : string;

    @Prop()
    endDay : string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    productId: Product;
    
}
export const PromotionSchema = SchemaFactory.createForClass(Promotion);
