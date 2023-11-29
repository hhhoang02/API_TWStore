import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PaymentInsertDTO } from "./dto/payment_insert_request";
import { Injectable } from "@nestjs/common";
import uploadImage from "src/upload/upload";
import { Payment, PaymentDocument } from "./payment.schema";
import { PaymentResponseDTO } from "./dto/payment_response";

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name)
        private readonly paymentModel: Model<PaymentDocument>,
    ) { }

    async addPaymentMethod(requestDTO: any): Promise<PaymentResponseDTO> {
        try {
            const { name, linkIcon }: PaymentInsertDTO = requestDTO;
            const banner = new this.paymentModel({ name, linkIcon });
            await banner.save()
            return {
                status: true,
                message: 'Insert banner success' + banner,
            };

        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Update address failed',
            }
        }
    }
    async getAllPaymentMethod(): Promise<PaymentResponseDTO | any> {
        try {
            const banner = await this.paymentModel.find();
            return {
                status: true,
                message: 'Get all paymentMethod success',
                data: banner
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Get all paymentMethod failed',
            }
        }
    }
    async deletePaymentMethod(id: Types.ObjectId): Promise<PaymentResponseDTO> {
        try {
            const { _id } = id;

            await this.paymentModel.findByIdAndDelete(_id);
            return {
                status: true,
                message: 'Delete payment success',
            }
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Delete payment failed',
            }
        }
    }
}