import { Event } from './event.schema';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { EventService } from './event.service';
import { ProductService } from 'src/product/product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';

@Controller('eventsCpanel')
export class EventsCpanelController {
  constructor(
    private readonly eventService: EventService,
    private readonly productService: ProductService,
  ) {}

  @Get('quanlysukien')
  @Render('quanlysukien')
  async quanlysukien(@Res() res: Response) {
    try {
      const events = await this.eventService.getAllEvent();
      return { events };
    } catch (error) {}
  }

  @Get('addEvent')
  @Render('addEvent')
  async addEventCpanel(@Res() res: Response) {
    try {
      const products = await this.productService.getAllProduct();
      return { products };
    } catch (error) {}
  }


  @UseInterceptors(FileInterceptor('image'))
  @Post('addEvent')
  async addEvent(@Body() body: any, @UploadedFile() files: Express.Multer.File, @Res() res: Response) {
    try {
      if(!files){
        return null;
      }
      await this.eventService.addEvent({ body , files });
      return res.redirect("/eventsCpanel/quanlysukien")
    } catch (error) {
      console.log(error);
    }
  }


  
  @Get('deleteEvent/:_id')
  async deleteEvent(@Param() _id: Types.ObjectId, @Res() res: Response) {
    try {
      await this.eventService.deleteEvent(_id);
      console.log(_id);
      
      return res.json({ result: true });
    } catch (error) {
      console.log(error);
    }
  }



}
