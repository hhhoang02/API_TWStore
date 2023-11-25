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
  @Get('login')
  @Render('login')
  async home(@Res() res: Response) {
    console.log(process.env.CONNECT);
    return {
      message: 'Hello',
    };
  }

  @Post('login')
  async Login(@Body() body: UserInfoLoginRequestDTO, @Res() res: Response) {
    try {
      const responseDTO: UserInfoResponseDTO = await this.userInfoService.LoginUser(
        body,
      );
      console.log('Login:', responseDTO);
      return responseDTO.status
        ? res.redirect('/usersCpanel/index')
        : res.redirect('login');
    } catch (error) { }
  }

  //http://localhost:3000/usersCpanel/quanlytaikhoan
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
      const users = await this.userService.UpdateInfoUser({ _id: id, active: active });
      console.log(users);

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
