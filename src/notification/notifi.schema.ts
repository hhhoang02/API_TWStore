import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import Document from "mongoose";


export type NotificationDocument = Notification & Document;

@Schema()
export class Notification {
    @Prop()
    title: string;

    @Prop()
    content: string;


}
export const NotificationSchema = SchemaFactory.createForClass(Notification);