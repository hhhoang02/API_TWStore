import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductInsertDTO } from "./dto/product_insert_request";
import { ProductUpdateDTO } from "./dto/product_update_request";
import { Response } from "express";
import { ProductGetbyIdDTO } from "./dto/product_getProductbyID_request";

@Controller('product')

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('addProduct')
    async AddProduct(@Body() body: ProductInsertDTO, @Res() res: Response) {
        try {
            const product = await this.productService.addProduct(body);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('updateProduct')
    async UpdateProduct(@Body() body: ProductUpdateDTO, @Res() res: Response) {
        try {
            const product = await this.productService.updateProduct(body);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('deleteProduct')
    async DeleteProduct(@Body() body: ProductUpdateDTO, @Res() res: Response) {
        try {
            const product = await this.productService.deleteProduct(body);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getProduct')
    async GetProduct(@Res() res: Response) {
        try {
            const product = await this.productService.getProduct();
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('getProductById')
    async GetProductById(@Body() body: ProductGetbyIdDTO, @Res() res: Response) {
        try {
            const product = await this.productService.getProductById(body);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}