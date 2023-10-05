
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId, SchemaTypes, Types } from "mongoose";
export type CommentDocument = Comment & Document
@Schema()
export class Comment {
    //Các thuộc tính của product
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId
    
    @Prop()
    createAt: string;

    @Prop()
    content: string;

    @Prop()
    star: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);