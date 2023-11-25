import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { SizeService } from "./size.service";
import { Response } from 'express';
import { SizeDeleteRequestDTO } from "./dto/size_delete_request";
import { SizeAddRequestDTO } from "./dto/size_add_request";
@Controller('sizesCpanel')
export class SizesCpanelController {
  constructor(
    private readonly sizeService: SizeService
  ) { }
  @Get('addSize')
  @Render('addSize')
  async AddSize(@Res() res: Response) {
      try {
          return {};
      } catch (error) {
          return error;
      }
  }
  @Post('addSize')
  async addSize(requestDTO: SizeAddRequestDTO, @Body() body:any, @Res() res: Response) {
      try {
          await this.sizeService.AddSize(body);
          return res.redirect('/sizesCpanel/quanlykichco');
      } catch (error) {
          console.log(error);
      }
  }
  @Get('quanlykichco')
  @Render('quanlykichco')
  async quanlykichco(@Res() res: Response) {
    try {
      const sizes = await this.sizeService.GetAllSize();
      return { sizes };
    } catch (error) {

    }
  }
  @Delete('quanlykichco/:_id/delete')
  async deleteSize(@Param() _id: SizeDeleteRequestDTO, @Res() res: Response,) {
    try {

      const result = await this.sizeService.DeleteSize(_id);
      return res.json({ result });
    } catch (error) {
      return res.json({ result: false });
    }
  }
}