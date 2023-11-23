import { Event } from './event.schema';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EventService } from './event.service';
import { ProductService } from 'src/product/product.service';

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
      console.log(products);
      return { products };
    } catch (error) {}
  }

  @Post('addEvent')
  async handleAddEvent(@Body() body: any, @Res() res: Response) {
    try {
      // Xử lý dữ liệu từ form ở đây, ví dụ lưu vào cơ sở dữ liệu
      console.log(body);

      // Gọi hàm để thêm sự kiện với dữ liệu từ form
      const event = await this.eventService.addEvent(body);

      // Redirect hoặc trả về dữ liệu cần thiết
      return res.status(200).json(event);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
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
