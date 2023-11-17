import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument, Users } from './user.schema';
import { UserResponseDTO } from './dto/user_response';
import { MailerService } from '@nestjs-modules/mailer';
import { UserGetByIDResponseDTO } from './dto/user_getByID_response';
import { UserAddressDTO } from './dto/user_updateAddress_request';
import { UserCart_FavoriteDTO } from './dto/user_updateCart_request';
import { UserUpdateInfoRequestDTO } from './dto/user_updateInfo_request';
import { UserGetByIDRequestDTO } from './dto/user_getByID_request';
import { UserAddIdRequestDTO } from './dto/user_addId_request';




@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>,
    ) { }


    //Hàm insert vào database
    async GetUserByID(requestDTO: UserGetByIDRequestDTO): Promise<UserGetByIDResponseDTO> {
        try {
            const _idUser = requestDTO;
            console.log(requestDTO);

            const user = await this.userModel.findOne({ _idUser });

            if (user) {
                return {
                    status: true,
                    message: 'Get User successfully',
                    data: user,
                }
            }
            let newUser = new this.userModel({ _idUser, avatar: null, cartID: [], favoriteID: null, gender: null, birthDay: null, address: [], commentID: null });
            await newUser.save();
            return {
                status: true,
                message: 'New User',
                data: newUser,
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Get User error',
                data: null,
            }
        }

    }

    async UpdateInfoUser(requestDTO: UserUpdateInfoRequestDTO): Promise<UserResponseDTO> {
        try {
            const { _id, avatar, gender, birthDay } = requestDTO;
            const user = await this.userModel.findById(_id);

            if (user) {
                user.avatar = avatar ? avatar : user.avatar;
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
            const { _id, typeUpdate, position, city, district, ward, street = "", phone } = requestDTO;
            const user = await this.userModel.findById(_id);
            console.log(user._id);
            if (typeUpdate === "insert") {
                console.log(requestDTO);

                user.address.push({ position: user.address.length + 1, city, district, ward, street, phone });
                await user.save();
                return {
                    status: true,
                    message: 'Add address successfully',
                }
            } else {
                user.address.splice(position - 1, 1);
                await user.save();
                return {
                    status: true,
                    message: 'Delete address successfully',
                }
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Update address failed',
            }
        }
    }
    async UpdateCart(requestDTO: UserCart_FavoriteDTO): Promise<UserResponseDTO> {
        try {
            const { _idUser, _idProduct } = requestDTO;
            const user = await this.userModel.findOne({ _idUser });
            if (user) {
                //user.cartID.push(_idProduct);
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
            console.log(error);

            return {
                status: false,
                message: 'Update cart error'
            }
        }
    }
    async UpdateFavorite(responseDTO: UserCart_FavoriteDTO): Promise<UserResponseDTO> {
        try {
            const { _idUser, _idProduct } = responseDTO;
            const user = await this.userModel.findById(_idUser);
            if (user) {
                // user.favoriteID.push(_idProduct);
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
