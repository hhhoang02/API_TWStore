import { Types } from "mongoose";
import { Event } from "../event.entity";

export class EventUpdateDTO extends Event{
    _id: string;
}