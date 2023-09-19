import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument, Users } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { log } from 'console';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserResponseDTO } from './dto/user_response';
import { UserSendMailRequestDTO } from './dto/user_sendmail_request';
import { MailerService } from '@nestjs-modules/mailer';
import { UserChangePasswordDTO } from './dto/user_changepassword_request';



enum saltOrRounds {
    salt = 10,
}
enum Email {
    FORM = "aaaaaahau@gmail.com",
    SUBJECT = "Testing Nest MailerModule ✔",
    HTML = "<b>NestJS Mail Testing</b>"
}
@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>,
        private readonly mailerService: MailerService) { }


    //Hàm insert vào database
    async RegisterUser(requestDTO: UserInsertRequestDTO): Promise<UserResponseDTO> {
        try {
            console.log(requestDTO);

            const { name, email, password, phone } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (user) {
                return {
                    status: false,
                    message: 'User already exists',
                }
            }
            const hashPassword = await bcrypt.hash(password, saltOrRounds.salt);
            const newUser = new this.userModel({
                name,
                email,
                password: hashPassword,
                phone,
            })
            await newUser.save();
            return {
                status: true,
                message: 'Register successfully',
            }
        } catch (error: any) {
            return {
                status: false,
                message: 'Failed',
            }
        }
    }

    async LoginUser(requestDTO: UserLoginRequestDTO): Promise<UserResponseDTO> {
        try {
            const { email, password } = requestDTO;

            const user = await this.userModel.findOne({ email });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found',
                }
            }
            let comparePassword = bcrypt.compareSync(password, (await user).password);
            console.log('Compare Password : ', comparePassword);
            if (!comparePassword) {
                return {
                    status: false,
                    message: 'Wrong password',
                }
            }
            return {
                status: true,
                message: 'Login successfully',
            }
        } catch (error: any) {

        }
    }

    async ForGotPass(requestDTO: UserForGotRequestDTO): Promise<UserResponseDTO> {
        try {
            console.log(requestDTO);
            const { email, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            console.log(user._id);

            const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.salt);
            if (user) {
                (await user).password = hashPassword;
                (await user).save();
                return {
                    status: true,
                    message: 'Update password successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'Update password failed',
                }
            }

        } catch (error) {
            return {
                status: false,
                message: 'Update password error',
            }
        }
    }

    async ChangePassword(requestDTO: UserChangePasswordDTO): Promise<UserResponseDTO> {
        try {
            const { email, oldPassword, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            let comparePassword = bcrypt.compareSync(oldPassword, (await user).password);
            if (comparePassword) {
                const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.salt);
                (await user).password = hashPassword;
                (await user).save();
                return {
                    status: true,
                    message: 'Change password successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'Change password failed',
                }
            }
        } catch (error) {
            return {
                status: false,
                message: 'Change password error',
            }
        }
    }


    async SendMail(requestDTO: UserSendMailRequestDTO): Promise<UserResponseDTO> {
        try {
            const { email } = requestDTO;
            const sendMail = this.mailerService.sendMail({
                to: email, // list of receivers
                from: Email.FORM, // sender address
                subject: Email.SUBJECT, // Subject line
                html: Email.HTML, // HTML body content
            })
            if (sendMail) {
                return {
                    status: true,
                    message: 'SendMail successfully',
                }
            } else {
                return {
                    status: false,
                    message: 'SendMail Failed',
                }
            }
        } catch (error) {
            return {
                status: false,
                message: error,
            }
        }
    }
}
