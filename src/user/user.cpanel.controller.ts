import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render, Put } from '@nestjs/common';
import { Response } from 'express';



import { UserService } from './user.service';
import { UserInfoLoginRequestDTO } from 'src/userInfo/dto/user_login_request';
import { UserInfoResponseDTO } from 'src/userInfo/dto/user_response';
import { UserInfoService } from 'src/userInfo/user.service';
import { Types } from 'mongoose';
//Url: http://localhost:3000/users
@Controller('usersCpanel')
export class UserCpanelController {
  constructor(
    private readonly userService: UserService,
    private readonly userInfoService: UserInfoService
  ) { }

  //Url: http://localhost:3000/usersCpanel/login
  //Url: http://localhost:3000/usersCpanel/login




  @Get('quanlytaikhoan')
  @Render('quanlytaikhoan')
  async quanlytaikhoan(@Res() res: Response) {
    try {
      const users = await this.userService.GetAllUsers();
      return { users };
    } catch (error) { }
  }

  @Put('setActive/:id')
  async blockAccount(@Param() id: Types.ObjectId, @Body() body: any, @Res() res: Response) {
    try {
      const { active } = body;
      const users = await this.userService.UpdateActiveUser({ _id: id, active: active });

      return res.json({ result: true });
    } catch (error) { }
  }

  @Get('index')
  @Render('index')
  async index(@Res() res: Response) {
    return {
      message: 'Hello'
    }
  }

}
