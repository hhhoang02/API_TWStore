import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDocument } from "./event.schema";
import { EventInsertDTO } from "./dto/event_insert_request";
import { EventResponseDTO } from "./dto/event_response";
import { EventUpdateDTO } from "./dto/event_update_request";
import { EventGetResponseDTO } from "./dto/event_get_response";
import { EventGetbyIdDTO } from "./dto/event_getEventbyID_request";


@Injectable()
export class EventService {
    constructor(@InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
    ) { }
    async addEvent(requestDTO: EventInsertDTO): Promise<EventResponseDTO> {
        try {
            const {eventImage , eventName , levelGiamgia , soNgayGiamgia , product} = requestDTO;
            console.log(requestDTO);

            const newEvent = new this.eventModel({
                eventImage, eventName , levelGiamgia , soNgayGiamgia , product
            });
            await newEvent.save();
            return {
                status: true,
                message: 'Add event successfully',
            }
        } catch (error) {
            console.log(error); 

            return {
                status: false,
                message: 'Add event failed',
            }
        }
    }
    async deleteEvent(requestDTO: EventUpdateDTO): Promise<EventResponseDTO> {
        try {
            const _id = requestDTO;
            const event = await this.eventModel.findByIdAndDelete(_id);
            if (!event) return {
                status: false,
                message: 'Event not found',
            };
            return {
                status: true,
                message: 'Delete event successfully',
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Delete event failed',
            }
        }
    }

    async getAllEvent(): Promise<EventGetResponseDTO[]> {
        try {
            const event = await this.eventModel.find().populate([{ path: 'Product', select: 'name' }])
            return event;
        } catch (error) {
            return
        }

    }

    async getEventById(requestDTO: EventGetbyIdDTO): Promise<any> {
        try {
            const _id = requestDTO;
            const event = await this.eventModel.findById(_id).populate([{ path: 'Product', select: 'name' }])
            console.log("event", event);
        } catch (error) {
            console.log(error);

        }
    }
    
    async getEventByIdProduct(requestDTO: EventGetbyIdDTO): Promise<any> {
        try {
            const _id = requestDTO;
            const event = await this.eventModel.find({product: _id}).populate([{ path: 'Product', select: 'name' }])
            return event
        } catch (error) {
            return
        }
    }
}