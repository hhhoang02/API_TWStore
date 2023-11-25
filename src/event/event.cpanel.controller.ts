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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EventUpdateDTO } from './dto/event_update_request';
import { EventGetbyIdDTO } from './dto/event_getEventbyID_request';

@Controller('eventsCpanel')
export class EventsCpanelController {
  constructor(
    private readonly eventService: EventService,
    private readonly productService: ProductService,
  ) {}

  @Get('addEvent')
  @Render('addEvent')
  async addEvent(@Res() res: Response) {
    try {
      const products = await this.productService.getAllProduct();
      return { products };
    } catch (error) {}
  }


  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
  ]))
  @Post('addEvent')
  async handleAddEvent(@Body() body: any, @UploadedFiles() files: { image?: Express.Multer.File[] }, @Res() res: Response) {
    try {
      if(!files){
        return null;
      }
      const event = await this.eventService.addEvent({ body , files });
      return res.redirect("/eventsCpanel/quanlysukien")
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  
  @Post('eventDetail/:_id/delete')
  async deleteProduct(@Param() _id: EventUpdateDTO, @Res() res: Response,) {
    try {
      console.log(_id);

      const result = await this.eventService.deleteEvent(_id);
      return res.json({ result });
    } catch (error) {
      return res.json({ result: false });
    }
  }

  @Get('quanlysukien')
  @Render('quanlysukien')
  async quanlysukien(@Res() res: Response) {
    try {
      const events = await this.eventService.getAllEvent();
      return { events };
    } catch (error) {}
  }

}
