import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserInsertResponseDTO } from 'src/user/dto/user_register_response';
import { UserDocument, Users } from './user.schema';
import { UserInsertRequestDTO } from './dto/user_register_request';
import { UserLoginRequestDTO } from './dto/user_login_request';
import { UserLoginResponseDTO } from './dto/user_login_reaponse';
import { log } from 'console';
import { UserForGotRequestDTO } from './dto/user_forgot_request';
import { UserForGotResponseDTO } from './dto/user_forgot_response';
@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>) { }


    //Hàm insert vào database
    async RegisterUser(requestDTO: UserInsertRequestDTO): Promise<UserInsertResponseDTO> {
        try {
            console.log(requestDTO);

            const { name, email, password, phone } = requestDTO;
            const saltOrRounds = 10;
            const user = await this.userModel.findOne({ email });
            if (user) {
                return {
                    status: false,
                    message: 'User already exists',
                }
            }
            const hashPassword = await bcrypt.hash(password, saltOrRounds)
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

    async LoginUser(requestDTO: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
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

    async ForGotPass(requestDTO: UserForGotRequestDTO): Promise<UserForGotResponseDTO> {
        console.log(requestDTO);
        const { email, password } = requestDTO;

        return
    }

}
