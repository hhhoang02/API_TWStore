import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInfoDocument, UsersInfo } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserInfoLoginRequestDTO } from './dto/user_login_request';
import { UserInfoForGotRequestDTO } from './dto/user_forgot_request';
import { UserInfoResponseDTO } from './dto/user_response';
import { UserInfoSendMailRequestDTO } from './dto/user_sendmail_request';
import { MailerService } from '@nestjs-modules/mailer';
import { UserChangeUserNameRequestDTO } from './dto/user_changeUserName_request';
import { UserInfoRegisterResponseDTO } from './dto/user_register_response';
import { UserGetAllResponseDTO } from '../user/dto/user_getAll_response';



enum saltOrRounds {
    SALT = 10
}
enum Email {
    FORM = "The Wonder Store",
    SUBJECT = "Testing Nest MailerModule ✔",
    HTML = "<b>NestJS Mail Testing</b>"
}



@Injectable()
export class UserInfoService {
    constructor(@InjectModel(UsersInfo.name)
    private readonly userModel: Model<UserInfoDocument>,
        private readonly mailerService: MailerService) { }


    //Hàm insert vào database
    async RegisterUser(requestDTO: UserInsertRequestDTO): Promise<UserInfoRegisterResponseDTO | UserInfoResponseDTO> {
        try {
            console.log(requestDTO);

            const { username, email, password, role } = requestDTO;
            const user = await this.userModel.findOne({ email });
            if (user) {
                return {
                    status: false,
                    message: 'User already exists',
                }
            }
            const hashPassword = await bcrypt.hash(password, saltOrRounds.SALT);
            const newUser = new this.userModel({
                username,
                email,
                password: hashPassword,
                role,
            })
            console.log(newUser);

            const { _id } = await newUser.save();
            return {
                status: true,
                message: 'Register successfully ',
                _id: _id

            }
        } catch (error: any) {
            return {
                status: false,
                message: 'Failed' + error,
            }
        }
    }

    async LoginUser(requestDTO: UserInfoLoginRequestDTO): Promise<any | UserInfoResponseDTO> {
        try {
            const { email, password } = requestDTO;

            const user = await this.userModel.findOne({ email });
            if (!user) {
                return {
                    status: false,
                    message: 'User not found',
                }
            }
            console.log(user.role);
            
            if(user.role === "user"){
                return {
                    status: false,
                    message: 'Need role to login',
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
                user: (await user)
            }
        } catch (error: any) {

        }
    }

    async ForGotPass(requestDTO: UserInfoForGotRequestDTO): Promise<UserInfoResponseDTO> {
        try {
            console.log(requestDTO);
            const { email, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            console.log(user._id);

            const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.SALT);
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

    async ChangePassword(requestDTO: any): Promise<UserInfoResponseDTO> {
        try {
            const { email, oldPassword, newPassword } = requestDTO;
            const user = await this.userModel.findOne({ email });
            let comparePassword = bcrypt.compareSync(oldPassword, (await user).password);
            if (comparePassword) {
                const hashPassword = await bcrypt.hash(newPassword, saltOrRounds.SALT);
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
    async VerifyUser(requestDTO: UserInfoSendMailRequestDTO): Promise<UserInfoResponseDTO> {
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

    async ChangeUserName(requestDTO: UserChangeUserNameRequestDTO): Promise<UserInfoResponseDTO> {
        try {
            const { email, username } = requestDTO;
            const user = await this.userModel.findOne({ email });
            (await user).username = username;
            (await user).save();
            return {
                status: true,
                message: 'Change username successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Change username error',
            }
        }
    }
}
