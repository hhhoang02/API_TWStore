import { Controller, Get, Render, Res } from "@nestjs/common";
import { SizeService } from "./size.service";
import { Response } from 'express';
@Controller('sizesCpanel')
export class SizesCpanelController {
  constructor(
    private readonly sizeService: SizeService
  ) { }

@Get('quanlykichco')
  @Render('quanlykichco')
  async quanlykichco(@Res() res: Response) {
    try {
      const sizes = await this.sizeService.GetAllSize();
      return { sizes };
    } catch (error) {

    }
  }
}