import { Controller, Get, Render, Res } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { Response } from 'express';
@Controller('brandsCpanel')
export class BrandsCpanelController {
  constructor(
    private readonly brandService: BrandService
  ) { }

@Get('quanlythuonghieu')
  @Render('quanlythuonghieu')
  async quanlythuonghieu(@Res() res: Response) {
    try {
      const brands = await this.brandService.GetAllBrand();
      return { brands };
    } catch (error) {

    }
  }
}