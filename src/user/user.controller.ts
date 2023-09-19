import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserSendMailRequestDTO } from './dto/user_sendmail_request';
import { UserChangePasswordDTO } from './dto/user_changepassword_request';
//Url: http://localhost:3000/users
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    //Url: http://localhost:3000/users/RegisterUser
    @Post('RegisterUser')
    async RegisterUser(@Body() body: UserInsertRequestDTO, @Res() res: any) {
        try {
            body = { ...body, rule: 'user' }
            const responseDTO = await this.userService.RegisterUser(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }
    //Url: http://localhost:3000/users/LoginUser
    @Post('LoginUser')
    async LoginUser(@Body() body: UserLoginRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.LoginUser(body);
            console.log(responseDTO);

            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }


    //Url: http://localhost:3000/users/ForgotPassword
    @Post('ForgotPassword')
    async ForGotPass(@Body() body: UserForGotRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.ForGotPass(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('SendMail')
    async SendMail(@Body() body: UserSendMailRequestDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.SendMail(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('ChangePassword')
    async ChangePassword(@Body() body: UserChangePasswordDTO, @Res() res: any) {
        try {
            const responseDTO = await this.userService.ChangePassword(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }



}
