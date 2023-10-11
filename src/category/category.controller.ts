import { Category } from './category.entity';
import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryAddRequestDTO } from './dto/category_add_request';
import { CategoryDeleteRequestDTO } from './dto/category_delete_request';
import { Response, Request } from 'express';
import { CategoryUpdateRequestDTO } from './dto/category_update_request.dto';
//Url: http://localhost:3000/category
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    //Url: http://localhost:3000/category/addCategory
    @Post('addCategory')
    async addCategory(@Body() body: CategoryAddRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.categoryService.addCategory(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }


    @Post('deleteCategory/:id')
    async delete(@Param('id') id : string, @Body() body: CategoryDeleteRequestDTO, @Res() res: Response){
        try {
            const responseDTO = await this.categoryService.deleteCategory(id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //Cập nhật sản phẩm
    //Url: http://localhost:3000/product/update/123
    @Post('updateCategory/:id')
    async update(@Param('id') id : string, @Body() body: CategoryUpdateRequestDTO, @Res() res: Response){
        try {
            const responseDTO = await this.categoryService.updateCategory(id, body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    //Lấy sản phẩm
    //Url: http://localhost:3000/category/getAllCategory
    @Get('getAllCategory')
    async getAllCategory(@Res() res:Response){
        try {
            //Đọc tất cả từ query string
            const responseDTO = await this.categoryService.getAllCategory();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error:any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}
