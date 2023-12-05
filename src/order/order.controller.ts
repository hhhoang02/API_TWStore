import { listProduct } from './order.schema';
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderInsertDTO } from "./dto/order_insert_request";
import { Response } from "express";
import { OrderGetbyIdDTO } from "./dto/order_getOrderbyID_request";
import { GetOrderByIdUser } from "./dto/order_getOrderbyIDUser_request";
import { ProductService } from "src/product/product.service";
@Controller('order')

export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly productService: ProductService
        ) { }
    @Post('addOrder')
    async AddOrder(@Body() body: OrderInsertDTO, @Res() res: Response) {
        try {
            const response = await this.orderService.addOrder(body);
            response.order.listProduct.map(async (item) => {
                await this.productService.updateProduct({_id:item.productID, body: {quantityOfOrder:item.quantityProduct}})  
            })
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getAllOrder')
    async GetAllOrder(@Res() res: Response) {
        try {
            const responseDTO = await this.orderService.getAllOrder();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getOrderByID/:_id')
    async GetOrderByID(@Param() _id: OrderGetbyIdDTO ,@Res() res: Response) {
        try {
            const responseDTO = await this.orderService.getOrderbyID(_id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getOrderByIdUser/:_id')
    async GetOrderByIdUser(@Param() _id: GetOrderByIdUser ,@Res() res: Response) {
        try {
            const responseDTO = await this.orderService.getOrderByIdUser(_id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}
