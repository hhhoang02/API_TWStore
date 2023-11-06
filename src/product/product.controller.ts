import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductInsertDTO } from "./dto/product_insert_request";
import { ProductUpdateDTO } from "./dto/product_update_request";
import { Response } from "express";
import { ProductGetbyIdDTO } from "./dto/product_getProductbyID_request";
import { ProductGetByIdCategoryRequestDTO } from "./dto/product_getProductbyIdCategory_request";

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
    @Delete('deleteProduct/:_id')
    async DeleteProduct(@Param() _id: ProductUpdateDTO, @Res() res: Response) {
        try {
            console.log(_id);

            const product = await this.productService.deleteProduct(_id);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getAllProduct')
    async GetAllProduct(@Res() res: Response) {
        try {
            const product = await this.productService.getAllProduct();
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getProductById/:_id')
    async GetProductById(@Param() _id: ProductGetbyIdDTO, @Res() res: Response) {
        try {
            const product = await this.productService.getProductById(_id);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('getProductByIdCategory/:_id')
    async GetProductByIdCategory(@Param() _id: ProductGetByIdCategoryRequestDTO, @Res() res: Response) {
        try {
            const product = await this.productService.getProductbyIdCategory(_id);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('getProductByIdBranch/:_id')
    async GetProductByIdBranch(@Param() _id: ProductGetByIdCategoryRequestDTO, @Res() res: Response) {
        try {
            const product = await this.productService.getProductbyIdBranch(_id);
            return res.status(HttpStatus.OK).json(product);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}