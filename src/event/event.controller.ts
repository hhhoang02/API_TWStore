import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventInsertDTO } from './dto/event_insert_request';
import { ProductService } from 'src/product/product.service';
import { Response } from 'express';
import { EventUpdateDTO } from './dto/event_update_request';
import { EventGetbyIdDTO } from './dto/event_getEventbyID_request';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly productService: ProductService,
  ) {}

  @Post('addEvent')
  async AddEvent(@Body() body: EventInsertDTO, @Res() res: Response) {
    try {
      const product = await this.productService.getAllProduct();
      const eventWithProduct = {
        ...body,
        product,
      };
      const event = await this.eventService.addEvent(eventWithProduct);
      console.log(event);
      
      return res.status(HttpStatus.OK).json(event);

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('deleteEvent/:_id')
  async DeleteEvent(@Param() _id: EventUpdateDTO, @Res() res: Response) {
    try {
      const event = await this.eventService.deleteEvent(_id);
      return res.status(HttpStatus.OK).json(event);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('getAllEvent')
  async getAllEvent(@Res() res: Response) {
    try {
      const event = await this.eventService.getAllEvent();
      return res.status(HttpStatus.OK).json(event);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('getEventById/:_id')
  async getEventById(@Param() _id: EventGetbyIdDTO, @Res() res: Response) {
    try {
      const event = await this.eventService.getEventById(_id);
      return res.status(HttpStatus.OK).json(event);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('getEventByIdProduct/:_id')
  async getEventByIdProduct(
    @Param() _id: EventGetbyIdDTO,
    @Res() res: Response,
  ) {
    try {
      const event = await this.eventService.getEventById(_id);
      return res.status(HttpStatus.OK).json(event);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
