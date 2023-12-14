import { Body, Controller, Get, Param, Put, Render, Res, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { OrderGetbyIdDTO } from './dto/order_getOrderbyID_request';
import { PromotionService } from 'src/promotion/promotion.service';
import { AuthenticatedGuard } from 'src/auth/authWeb.guard';
@Controller('ordersCpanel')
export class OrderCpanelController {
  constructor(
    private readonly orderService: OrderService,
    private readonly promotionService: PromotionService
  ) { }
  @UseGuards(AuthenticatedGuard)
  @Get('quanlydonhang')
  @Render('quanlydonhang')
  async quanlydonhang(@Res() res: Response) {
    try {
      const orders = await this.orderService.getAllOrder();
      return { orders };
    } catch (error) { }
  }
  @UseGuards(AuthenticatedGuard)
  @Get('orderDetail/:_id')
  @Render('orderDetail')
  async orderDetail(@Param() _id: OrderGetbyIdDTO, @Res() res: Response) {
    try {
      const orders = await this.orderService.getOrderbyID(_id);
      const voucher = await this.promotionService.getAllPromotion();
      const yourVoucher = voucher.filter((voucher: any) => voucher.discountCode == orders.voucher)
      const discountLevel = yourVoucher.map((voucher: any) => voucher.discountLevel)
      return { orders, listProduct: orders.listProduct, discountLevel };
    } catch (error) { }
  }

  @Put('updateStatusOrder/:id')
  async updateStatusOrder(@Param('id') id: string, @Body() body: any, @Res() res: Response) {
    try {
      const order =  await this.orderService.updateStatusOrder({ id, body });
      return res.json({ result: true , userID : order.userID  , statusOrder : order.statusOrder});
    } catch (error) {
    }
  }
  


  @Get('/RevenueByYear/:year')
  async getYearRevenue(@Param('year') year: number): Promise<number[]> {
    return await this.orderService.getAnnualRevenue(year);
  }
  @Get('/RevenueByMonth')
  async getMonthlyRevenue(): Promise<number> {
    const date = new Date();
    return await this.orderService.getMonthlyRevenue(date.getFullYear(), date.getMonth());
  }
}
