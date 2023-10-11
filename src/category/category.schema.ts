
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type CategoryDocument = Category & Document
@Schema()
export class Category{
    //Các thuộc tính của product
    @Prop()
    name: string;

    @Prop()
    type: string;

}

export const CategorySchema = SchemaFactory.createForClass(Category);