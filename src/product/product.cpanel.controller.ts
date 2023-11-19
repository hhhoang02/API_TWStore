
import { CategoryController } from './../category/category.controller';

import { Controller, Get, Param, Post, Render, Res} from "@nestjs/common";
import { ProductService } from "./product.service";
import { Response } from 'express';
import { CategoryService } from "src/category/category.service";
import { CategoryGetAllResponseDTO } from 'src/category/dto/category_getAll_response';
import { ColorService } from 'src/colorProduct/color.service';
import { SizeService } from 'src/size/size.service';
import { BrandService } from 'src/brand/brand.service';
import { ProductGetbyIdDTO } from './dto/product_getProductbyID_request';
@Controller('productsCpanel')
export class ProductsCpanelController {
    constructor(
        private readonly productService: ProductService,
        private readonly categoryService: CategoryService,
        private readonly colorService : ColorService,
        private readonly sizeService : SizeService,
        private readonly brandService : BrandService
    ) { }

    @Get('addProduct')
    @Render('addProduct')
    async addProduct(@Res() res: Response) {
      try {
        const categories = await this.categoryService.GetAllCategory();
        const colors = await this.colorService.GetAllColor();
        const sizes = await this.sizeService.GetAllSize();
        const brands = await this.brandService.GetAllBrand();
        return {categories, colors, sizes,brands};
    } catch (error) {
        
    }
    }

    @Get('getProductById/:_id')
    @Render('getProductById')
    async getProductById(@Param() _id: ProductGetbyIdDTO,@Res() res: Response) {
      try {
        const product_detail = await this.productService.getProductById(_id);
        return {product_detail};
    } catch (error) {
        
    }
    }

    @Get('quanlysanpham')
    @Render('quanlysanpham')
    async quanlysanpham(@Res() res: Response) {
        try {
            const products = await this.productService.getAllProduct();
            return {products} ;
        } catch (error) {

        }
    }
    @Get('quanlydonhang')
    @Render('quanlydonhang')
    async quanlydonhang(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('quanlysukien')
    @Render('quanlysukien')
    async quanlysukien(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('quanlythanhtoan')
    @Render('quanlythanhtoan')
    async quanlythanhtoan(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
}
