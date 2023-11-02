import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render } from '@nestjs/common';
import { Response } from 'express';



import { UserService } from './user.service';
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
