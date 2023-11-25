import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { ColorService } from "./color.service";
import { Response } from 'express';
import { ColorDeleteRequestDTO } from "./dto/color_delete_request";
import { ColorAddRequestDTO } from "./dto/color_add_request";
@Controller('colorsCpanel')
export class ColorsCpanelController {
  constructor(
    private readonly colorService: ColorService
  ) { }
  @Get('addColor')
  @Render('addColor')
  async AddColor(@Res() res: Response) {
      try {
          return {};
      } catch (error) {
          return error;
      }
  }
  @Post('addColor')
  async addColor(requestDTO: ColorAddRequestDTO, @Body() body:any, @Res() res: Response) {
      try {
          await this.colorService.AddColor(body);
          return res.redirect('/colorsCpanel/quanlymau');
      } catch (error) {
          console.log(error);
      }
  }
  @Get('quanlymau')
    @Render('quanlymau')
    async quanlyhang(@Res() res: Response) {
      try {
        const colors = await this.colorService.GetAllColor();
        return { colors };
      } catch (error) {

      }
  }
  @Delete('quanlymau/:_id/delete')
  async deleteColor(@Param() _id: ColorDeleteRequestDTO, @Res() res: Response,) {
    try {

      const result = await this.colorService.DeleteColor(_id);
      return res.json({ result });
    } catch (error) {
      return res.json({ result: false });
    }
  }
}
