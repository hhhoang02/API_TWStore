import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type EventDocument = Event & Document;

@Schema()
export class Event {

}
export const EventSchema = SchemaFactory.createForClass(Event);