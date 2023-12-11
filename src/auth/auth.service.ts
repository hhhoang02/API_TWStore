import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserInfoService } from "src/userInfo/user.service";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private userInfoService: UserInfoService,
        private jwtService: JwtService
    ) { }
    async signIn(request: any) {
        const { email, password } = request;
        const user = await this.userInfoService.LoginUser({ email });
        let comparePassword = bcrypt.compareSync(password, (await user).password);
        console.log('Compare Password : ', comparePassword);
        if (!comparePassword) {
            return {
                status: false,
                message: 'Wrong password',
            }
        }
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user
        };
    }

}