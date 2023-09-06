import{Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode} from '@nestjs/common';
import { UserService } from './user.service';
import {UserInsertRequestDTO} from './dto/user_insert_request';
//Url: http://localhost:3000/users
@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService){}

    //Url: http://localhost:3000/users/insert
    @Post('insert')
    async insert(@Body() body:UserInsertRequestDTO, @Res() res:any){
        try {
            const responseDTO = await this.userService.insert(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error:any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
        
    }

    //Url: http://localhost:3000/san-pham/get
    /*@Get('get')
    async get(@Res() res:any){
        try {
            const responseDTO = await this.productService.get();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error:any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }*/

}
