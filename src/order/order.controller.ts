import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderInsertDTO } from "./dto/order_insert_request";
import { Response } from "express";
@Controller('order')

export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    @Post('addOrder')
    async AddOrder(@Body() body: OrderInsertDTO, @Res() res: Response) {
        try {
            const order = await this.orderService.addOrder(body);
            return res.status(HttpStatus.OK).json(order);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}
