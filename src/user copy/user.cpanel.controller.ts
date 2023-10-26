import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render } from '@nestjs/common';
import { Response } from 'express';



import { UserService } from './user.service';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserResponseDTO } from './dto/user_response';
//Url: http://localhost:3000/users
@Controller('usersCpanel')
export class UserCpanelController {
    constructor(private readonly userService: UserService) { }

    //Url: http://localhost:3000/usersCpanel/login
    @Get('login')
    @Render('login')
    async home(@Res() res: Response) {
        console.log(process.env.CONNECT);
        return {
            message: 'Hello'
        }
    }
    @Post('login')
    async Login(@Body() body: UserLoginRequestDTO, @Res() res: Response) {
        try {
            
            const responseDTO: UserResponseDTO = await this.userService.LoginUser(body);
            console.log("Login:", responseDTO)
            return responseDTO.status ? res.redirect('/usersCpanel/index') : res.redirect('login');
        } catch (error) {

        }
    }



    @Get('index')
    @Render('index')
    async index(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('tables')
    @Render('tables')
    async table(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }



}
