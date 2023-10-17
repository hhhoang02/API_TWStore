import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument, Users } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserResponseDTO } from './dto/user_response';
import { UserSendMailRequestDTO } from './dto/user_sendmail_request';
import { MailerService } from '@nestjs-modules/mailer';
import { UserChangePasswordDTO } from './dto/user_changePassword_request';
import { UserAddressDTO } from './dto/user_updateAddress_request';
import { UserCart_FavoriteDTO } from './dto/user_updateCart_request';
import { UserUpdateInfoRequestDTO } from './dto/user_updateInfo_request';



enum saltOrRounds {
    SALT = 10
}
enum Email {
    FORM = "The Wonder Store",
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

            const { username, email, password, phone, role } = requestDTO;
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
                phone,
                role,
            })
            console.log(newUser);

            await newUser.save();
            return {
                status: true,
                message: 'Register successfully',
            }
        } catch (error: any) {
            return {
                status: false,
                message: 'Failed' + error,
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

    async ChangePassword(requestDTO: UserChangePasswordDTO): Promise<UserResponseDTO> {
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
    async VerifyUser(requestDTO: UserSendMailRequestDTO): Promise<UserResponseDTO> {
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
    async UpdateInfoUser(responseDTO: UserUpdateInfoRequestDTO): Promise<UserResponseDTO> {
        try {
            const { email, username, avatar, phone, gender, birthDay } = responseDTO;
            const user = await this.userModel.findOne({ email });
            if (user) {
                user.username = username ? username : user.username;
                user.avatar = avatar ? avatar : user.avatar;
                user.phone = phone ? phone : user.phone;
                user.gender = gender ? gender : user.gender;
                user.birthDay = birthDay ? birthDay : user.birthDay;
                await user.save();
                return {
                    status: true,
                    message: 'Update User successfully'
                }
            }
            return {
                status: false,
                message: 'Update User failed'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update favoUserrite error'
            }
        }
    }
    async UpdateAddressUser(requestDTO: UserAddressDTO): Promise<UserResponseDTO> {
        try {
            const { typeUpdate, key, emailUser, city, district, ward, street, phone } = requestDTO;
            const user = await this.userModel.findOne({ emailUser });
            console.log(user._id);
            if (typeUpdate === "insert") {
                user.address.push({ key: user.address.length + 1, city, district, ward, street, phone });
                await user.save();
                return {
                    status: true,
                    message: 'Add address successfully',
                }
            } else {
                user.address.splice(key, 1);
                await user.save();
                return {
                    status: true,
                    message: 'Delete address successfully',
                }
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update address failed',
            }
        }
    }
    async UpdateCart(responseDTO: UserCart_FavoriteDTO): Promise<UserResponseDTO> {
        try {
            const { emailUser, _idProduct } = responseDTO;
            const user = await this.userModel.findOne({ emailUser });
            if (user) {
                user.cartID.push(_idProduct);
                await user.save();
                return {
                    status: true,
                    message: 'Update cart successfully'
                }
            }
            return {
                status: false,
                message: 'Update cart failed'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update cart error'
            }
        }
    }
    async UpdateFavorite(responseDTO: UserCart_FavoriteDTO): Promise<UserResponseDTO> {
        try {
            const { emailUser, _idProduct } = responseDTO;
            const user = await this.userModel.findOne({ emailUser });
            if (user) {
                user.favoriteID.push(_idProduct);
                await user.save();
                return {
                    status: true,
                    message: 'Update favorite successfully'
                }
            }
            return {
                status: false,
                message: 'Update favorite failed'
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update favorite error'
            }
        }
    }
}
