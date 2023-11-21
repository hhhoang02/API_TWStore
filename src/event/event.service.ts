import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDocument } from "./event.schema";

@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
    ) { }
}