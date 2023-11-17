import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "./order.schema";
import { Model } from "mongoose";
import { OrderInsertDTO } from "./dto/order_insert_request";
import { OrderResponseDTO } from "./dto/order_response";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) 
        private readonly orderModel: Model<OrderDocument>,

    ) { }
    async addOrder(requestDTO: OrderInsertDTO): Promise<OrderResponseDTO>{
        try {
            const { status, productID, quantity, bookingDate, deliveryDate, userID, promotionID } = requestDTO;
            console.log(requestDTO);

            const newOrder = new this.orderModel({
                status, 
                productID, 
                quantity, 
                bookingDate, 
                deliveryDate, 
                userID, 
                promotionID
            });
            await newOrder.save();
            return {
                status: true,
                message: 'Add order successfully',
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Add order failed',
            }
        }
    }
    
}