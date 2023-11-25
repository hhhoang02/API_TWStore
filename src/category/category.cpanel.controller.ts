import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Response } from 'express';
import { CategoryDeleteRequestDTO } from "./dto/category_delete_request";
import { CategoryAddRequestDTO } from "./dto/category_add_request";
@Controller('categoriesCpanel')
export class CategoriesCpanelController {
  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Get('addCategory')
  @Render('addCategory')
  async AddCategory(@Res() res: Response) {
      try {
          return {};
      } catch (error) {
          return error;
      }
  }
  @Post('addCategory')
  async addCategory(requestDTO: CategoryAddRequestDTO, @Body() body:any, @Res() res: Response) {
      try {
          await this.categoryService.AddCategory(body);
          return res.redirect('/categoriesCpanel/quanlytheloai');
      } catch (error) {
          console.log(error);
      }
  }


  @Get('quanlytheloai')
  @Render('quanlytheloai')
  async quanlytheloai(@Res() res: Response) {
    try {
      const categories = await this.categoryService.GetAllCategory();
      return { categories };
    } catch (error) {

    }
  }
  @Delete('quanlytheloai/:_id/delete')
  async deleteCategory(@Param() _id: CategoryDeleteRequestDTO, @Res() res: Response,) {
    try {

      const result = await this.categoryService.DeleteCategory(_id);
      return res.json({ result });
    } catch (error) {
      return res.json({ result: false });
    }
  }
}