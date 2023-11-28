import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument, listProduct } from './order.schema';
import { Model } from 'mongoose';
import { OrderInsertDTO } from './dto/order_insert_request';
import { OrderResponseDTO } from './dto/order_response';
import { OrderGetbyIdDTO } from './dto/order_getOrderbyID_request';
import { OrderGetResponseDTO } from './dto/order_get_response';
import { Product } from 'src/product/product.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}
  async addOrder(requestDTO: OrderInsertDTO): Promise<OrderResponseDTO> {
    try {
      const {
        status,
        listProduct,
        bookingDate,
        deliveryDate,
        userID,
        promotionID,
        phoneReceiver,
        nameReceiver,
      } = requestDTO;
      console.log(requestDTO);

      const newOrder = new this.orderModel({
        status,
        listProduct,
        bookingDate,
        deliveryDate,
        userID,
        promotionID,
        phoneReceiver,
        nameReceiver,
      });
      await newOrder.save();
      return {
        status: true,
        message: 'Add order successfully',
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Add order failed',
      };
    }
  }
  async getAllOrder(): Promise<OrderResponseDTO | any> {
    try {
      const order = await this.orderModel
        .find()
        .populate([
          { path: 'listProduct', populate: { path: 'productID' } },
          { path: 'userID' },
          { path: 'promotionID', select: 'name' },
        ]);
      return order;
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'Get all banner failed',
      };
    }
  }
  async getOrderbyID(
    requestDTO: OrderGetbyIdDTO,
  ): Promise<OrderGetResponseDTO> {
    try {
      const _id = requestDTO;
      const order = await this.orderModel.findById(_id).populate([
        {
          path: 'listProduct',
          populate: {
            path: 'productID',
            model: 'Product',
            select: ['productName','price']
          },
        },
        { path: 'userID' },
        { path: 'promotionID', select: 'name' },
      ]);
      return order;
    } catch (error) {
      console.log(error);
    }
  }
}
