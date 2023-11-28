import { listProduct } from './order.schema';
import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { OrderGetbyIdDTO } from './dto/order_getOrderbyID_request';
import { log } from 'console';
@Controller('ordersCpanel')
export class OrderCpanelController {
  constructor(private readonly orderService: OrderService) {}

  @Get('quanlydonhang')
  @Render('quanlydonhang')
  async quanlydonhang(@Res() res: Response) {
    try {
      const orders = await this.orderService.getAllOrder();
      
      return { orders };
    } catch (error) {}
  }

  @Get('orderDetail/:_id')
  @Render('orderDetail')
  async orderDetail(@Param() _id: OrderGetbyIdDTO, @Res() res: Response) {
    try {
      const orders = await this.orderService.getOrderbyID(_id);
      console.log(orders.userID.address);
      return { orders,listProduct:orders.listProduct };
    } catch (error) {}
  }
}
