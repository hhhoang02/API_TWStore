import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  
  @Get('')
  async table(@Res() res: Response) {
    return res.redirect('/usersCpanel/login')
  }
}
