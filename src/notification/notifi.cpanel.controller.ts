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
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { NotificationService } from './notifi.service';

@Controller('notifiCpanel')
export class NotificationCpanelController {
  constructor(
    private readonly notifiService: NotificationService,
  ) {}

  @Get('quanlythongbao')
  @Render('quanlythongbao')
  async quanlythongbao(@Res() res: Response) {
    try {
      const notifi = await this.notifiService.getAllNotification();
      return { notifi };
    } catch (error) {}
  }

  @Get('addNotification')
  @Render('addNotification')
  async addNotifiCpanel(@Res() res: Response) {
    try {
      const notifi = await this.notifiService.getAllNotification();
      return { notifi };
    } catch (error) {}
  }


  @Post('addNotification')
  async addNotification(@Body() body: any, @Res() res: Response) {
    try {
      
      await this.notifiService.addNotification( body );
      return ;
    } catch (error) {
      console.log(error);
    }
  }

}
