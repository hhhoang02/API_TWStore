import { Body, Controller, Get, HttpCode, Post, UseGuards, HttpStatus, Res, Render, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UserInfoLoginRequestDTO } from "src/userInfo/dto/user_login_request";
import { UserInfoResponseDTO } from "src/userInfo/dto/user_response";
import { Response, Request } from "express";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto);
    }

    @Get('loginWeb')
    @Render('login')
    async home(@Res() res: Response) {
        console.log(process.env.CONNECT);
        return {
            message: 'Hello',
        };
    }
    @Post('loginWeb')
    async Login(@Req() req: Request, @Body() body: UserInfoLoginRequestDTO, @Res() res: Response) {
        try {
            const responseDTO: UserInfoResponseDTO | any = await this.authService.signIn(body);
            responseDTO && res.setHeader('Authorization', `Bearer ${responseDTO.access_token}`);
            if (responseDTO.user.role === 'admin') {
                return res.redirect('/usersCpanel/index');
            }
            return res.redirect('login');
        } catch (error) { }
    }
    // @UseGuards(AuthGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user;
    // }
}