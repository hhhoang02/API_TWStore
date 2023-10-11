
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type BranchDocument = Branch & Document
@Schema()
export class Branch{
    //Các thuộc tính của product
    @Prop()
    name: string;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);