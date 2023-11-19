import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  HttpStatus,
  HttpCode,
  Render,
} from '@nestjs/common';
import { Response } from 'express';

import { UserInfoService } from './user.service';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoResponseDTO } from './dto/user_response';
import { UserGetAllResponseDTO } from './dto/user_getAll_response';
//Url: http://localhost:3000/users
@Controller('usersCpanel')
export class UserCpanelController {
  constructor(private readonly userService: UserInfoService) {}

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
      const responseDTO: UserInfoResponseDTO = await this.userService.LoginUser(
        body,
      );
      console.log('Login:', responseDTO);
      return responseDTO.status
        ? res.redirect('/usersCpanel/index')
        : res.redirect('login');
    } catch (error) {}
  }

  @Get('index')
  @Render('index')
  async index(@Res() res: Response) {
    return {
      message: 'Hello',
    };
  }
  //http://localhost:3000/usersCpanel/quanlytaikhoan
  @Get('quanlytaikhoan')
  async getAllUsers(@Res() res: Response) {
    try {
      const users = await this.userService.GetAllUsers();
      return { users };
    } catch (error) {}
  }
  @Get('addUser')
  @Render('addUser')
  async addUser(@Res() res: Response) {
    return {
      message: 'Hello',
    };
  }
}
