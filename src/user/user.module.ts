import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";



import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, Users } from './user.schema';
import { UserCpanelController } from "./user.cpanel.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { UserInfoModule } from "src/userInfo/user.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UserSchema },
        ]),
        UserInfoModule
    ],
    controllers: [UserController, UserCpanelController],
    providers: [UserService],
    
})
export class UserModule { }