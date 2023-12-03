import { listProduct } from './order.schema';
import { Body, Controller, Get, Param, Put, Render, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { OrderGetbyIdDTO } from './dto/order_getOrderbyID_request';
import { log } from 'console';
import Handlebars from 'handlebars';
@Controller('ordersCpanel')
export class OrderCpanelController {
  constructor(private readonly orderService: OrderService) { }

  @Get('quanlydonhang')
  @Render('quanlydonhang')
  async quanlydonhang(@Res() res: Response) {
    try {
      const data = await this.orderService.getAllOrder();

      const orders = data.map((order: any) => order.status === 1 ? { order, status: true } : { order, status: false });
      console.log(orders);

      return { orders };
    } catch (error) { }
  }

  @Get('orderDetail/:_id')
  @Render('orderDetail')
  async orderDetail(@Param() _id: OrderGetbyIdDTO, @Res() res: Response) {
    try {
      const orders = await this.orderService.getOrderbyID(_id);
      return { orders, listProduct: orders.listProduct };
    } catch (error) { }
  }

  @Put('updateStatusOrder/:id')
  async updateStatusOrder(@Param() id: { id: string }, @Res() res: Response) {
    try {
      const order = await this.orderService.updateStatusOrder(id);
      return res.json({ result: true })
    } catch (error) {

    }
  }
  
}
