import { Controller, Get, Render, Res } from "@nestjs/common";
import { ColorService } from "./color.service";
import { Response } from 'express';
@Controller('colorsCpanel')
export class ColorsCpanelController {
  constructor(
    private readonly colorService: ColorService
  ) { }

@Get('quanlymau')
  @Render('quanlymau')
  async quanlyhang(@Res() res: Response) {
    try {
      const colors = await this.colorService.GetAllColor();
      return { colors };
    } catch (error) {

    }
  }
}