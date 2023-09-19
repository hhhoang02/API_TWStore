import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";



import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, Users } from './user.schema';
import { UserCpanelController } from "./user.cpanel.controller";
import { MailerModule } from "@nestjs-modules/mailer";

enum MailAdmin {
    EMAIL = "aaaaaahau@gmail.com",
    PASSWORD = "xjfkcgzyhemluquh",
    HOST = "smtp.gmail.com"
}

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Users.name, schema: UserSchema },
        ]),
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    service: 'gmail',
                    host: MailAdmin.HOST,
                    auth: {
                        user: MailAdmin.EMAIL,
                        pass: MailAdmin.PASSWORD
                    }
                }
            })
        })
    ],
    controllers: [UserController, UserCpanelController],
    providers: [UserService],
})
export class UserModule { }