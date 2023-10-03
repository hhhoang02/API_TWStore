import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";



import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, Users } from './user.schema';
import { UserCpanelController } from "./user.cpanel.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import { AddressModule } from "src/address/address.module";

enum MailAdmin {
    EMAIL = "thewondershopfashion@gmail.com",
    //thewondershopfashion@gmail.com
    PASSWORD = "dgeyqrqpmimvpylr",
    //dgeyqrqpmimvpylr
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
        }),
        
    ],
    controllers: [UserController, UserCpanelController],
    providers: [UserService],
})
export class UserModule { }