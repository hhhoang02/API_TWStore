import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument, listProduct } from './order.schema';
import { Model, Types } from 'mongoose';
import { OrderInsertDTO } from './dto/order_insert_request';
import { OrderResponseDTO } from './dto/order_response';
import { OrderGetbyIdDTO } from './dto/order_getOrderbyID_request';
import { OrderGetResponseDTO } from './dto/order_get_response';
import { Product } from 'src/product/product.schema';
import { GetOrderByIdUser } from './dto/order_getOrderbyIDUser_request';
import { ProductService } from 'src/product/product.service';
import { log } from 'console';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) { }
  async addOrder(requestDTO: OrderInsertDTO): Promise<OrderResponseDTO> {
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    try {
      const {
        orderCode = Math.floor(Math.random() * (999999 - 100000)) + 100000,
        status = 1,
        listProduct,
        bookingDate = `${hour}: ${minutes}, ${day}/${month}/${year}`,
        deliveryDate = `${day + 5}/${month}/${year}`,
        userID,
        voucher,
        phoneReceiver,
        nameReceiver,
        addressDelivery,
        payment,
        totalPrice
      } = requestDTO;
      const newOrder = new this.orderModel({
        orderCode,
        status,
        listProduct,
        bookingDate,
        deliveryDate,
        userID,
        voucher,
        phoneReceiver,
        nameReceiver,
        addressDelivery,
        payment,
        totalPrice,
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
  async getOrderbyID(requestDTO: OrderGetbyIdDTO,): Promise<OrderGetResponseDTO> {
    try {
      const _id = requestDTO;
      const order = await this.orderModel.findById(_id).populate([
        {
          path: 'listProduct',
          populate: [
            {
              path: 'productID',
              model: 'Product',
              select: ['productName', 'price', 'offer', 'voucher'],
            },
            { path: 'colorID', model: 'Color', select: 'name' },
            { path: 'sizeID', model: 'Size', select: 'name' },
          ],
        },
        { path: 'userID' },
      ]);
      return order;
    } catch (error) {
      console.log(error);
    }
  }
  async getOrderbyIDUser(requestDTO: OrderGetbyIdDTO,): Promise<OrderGetResponseDTO[]> {
    try {
      const _id = requestDTO;
      const order = await this.orderModel.find({ userID: _id }).populate([
        {
          path: 'listProduct',
          populate: [{
            path: 'productID',
            model: 'Product',
            select: ['productName', 'price']
          },
          { path: 'colorID', model: 'Color', select: 'name' }
            , { path: 'sizeID', model: 'Size', select: 'name' }
          ],
        },
        { path: 'userID' },
      ]);
      return order;
    } catch (error) {
      console.log(error);
    }
  }
  async updateStatusOrder(requestDTO: { id: string, body: any }): Promise<OrderResponseDTO> {
    try {
      const { id } = requestDTO;
      const { status } = requestDTO.body
      const order = await this.orderModel.findById(id);
      if (order) {
        order.status = status;
        await order.save();
        return {
          status: true,
          message: 'Update status for Order successfully',
        };
      } else {
        return {
          status: false,
          message: 'Update status for Order failed',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'Update status for Order failed',
      };
    }
  }
  async getOrderByIdUser(requestDTO: GetOrderByIdUser): Promise<OrderGetResponseDTO[]> {
    try {
      const _id = requestDTO;
      const order = await this.orderModel.find({ userID: _id }).populate([
        {
          path: 'listProduct',
          populate: [
            {
              path: 'productID',
              model: 'Product',
              select: ['productName', 'price'],
            },
            { path: 'colorID', model: 'Color', select: 'name' },
            { path: 'sizeID', model: 'Size', select: 'name' },
          ],
        },
        { path: 'userID' },
      ]);
      return order;
    } catch (error) {
      return;
    }
  }
}
