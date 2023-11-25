import { Controller, Get, Render, Res } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Response } from 'express';
@Controller('categoriesCpanel')
export class CategoriesCpanelController {
  constructor(
    private readonly categoryService: CategoryService
  ) { }

  @Get('quanlytheloai')
  @Render('quanlytheloai')
  async quanlytheloai(@Res() res: Response) {
    try {
      const categories = await this.categoryService.GetAllCategory();
      return { categories };
    } catch (error) {

    }
  }
}