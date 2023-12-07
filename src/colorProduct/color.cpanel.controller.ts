import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Render, Res } from "@nestjs/common";
import { ColorService } from "./color.service";
import { Response } from 'express';
import { ColorDeleteRequestDTO } from "./dto/color_delete_request";
import { ColorAddRequestDTO } from "./dto/color_add_request";
import { Types } from "mongoose";
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
  @Delete('deleteColor/:id/delete')
  async DeleteColor(@Param() id: Types.ObjectId, @Res() res: Response) {
    try {
      const responseDTO = await this.colorService.DeleteColor(id);
      return res.json({ result: true });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }


  @Get('addColor')
  @Render('addColor')
  async AddColorRender(@Res() res: Response) {
    try {
      const colors = await this.colorService.GetAllColor();
      console.log(colors);
      return { colors };
    } catch (error) {

    }
  }
  @Post('addColor')
  async AddColor(@Body() body: ColorAddRequestDTO, @Res() res: Response) {
    try {
      const responseDTO = await this.colorService.AddColor(body);
      return res.redirect('/colorsCpanel/quanlymau');
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);

    }
  }
}