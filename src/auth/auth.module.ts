import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserInfoModule } from "src/userInfo/user.module";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UserInfoModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }