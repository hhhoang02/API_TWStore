import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import uploadImage from 'src/upload/upload';
import { NotifiGetResponseDTO } from "./dto/notifi_get_response";
import { Notification, NotificationDocument } from "./notifi.schema";
import { NotificationInsertDTO } from "./dto/notifi_insert_request";


@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification.name)
    private readonly notifiModel: Model<NotificationDocument>,
    ) { }
    async addNotification(requestDTO: NotificationInsertDTO): Promise<NotifiGetResponseDTO> {

        try {
            const {title , content  } = requestDTO;
            const newNotifi = new this.notifiModel({
                title,
                content,
            });
            return { 
                status: true,
                message: 'Notification added successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: error.message,
            }
        }
    }

    async getAllNotification(): Promise<NotifiGetResponseDTO | any> {
        try {
            const notifi = await this.notifiModel.find();
            return notifi;
        } catch (error) {
            return
        }

    }
}
