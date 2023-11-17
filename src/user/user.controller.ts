import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { UserUpdateInfoRequestDTO } from './dto/user_updateInfo_request';
import { UserAddressDTO } from './dto/user_updateAddress_request';
import { UserCart_FavoriteDTO } from './dto/user_updateCart_request';
import { UserGetByIDRequestDTO } from './dto/user_getByID_request';
//Url: http://localhost:3000/users
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    //Url: http://localhost:3000/users/RegisterUser

    @Post('getUser/:id')
    async getUserByID(@Param('id') _id: UserGetByIDRequestDTO, @Res() res: Response) {
        try {
            const user = await this.userService.GetUserByID(_id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Post('updateInfoUser')
    async UpdateInfoUser(@Body() body: UserUpdateInfoRequestDTO, @Res() res: Response) {
        try {
            const user = await this.userService.UpdateInfoUser(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);

        }
    }
    @Post('updateAddressUser')
    async UpdateAddressUser(@Body() body: UserAddressDTO, @Res() res: Response) {
        try {
            const user = await this.userService.UpdateAddressUser(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Post('updateCart')
    async UpdateCart(@Body() body: UserCart_FavoriteDTO, @Res() res: Response) {
        try {
            const user = await this.userService.UpdateCart(body);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }





}
