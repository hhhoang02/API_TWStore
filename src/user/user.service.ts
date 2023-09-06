import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserInsertResponseDTO } from 'src/user/dto/user_insert_response';
import {UserDocument, Users} from './user.schema';
import { UserInsertRequestDTO } from './dto/user_insert_request';
@Injectable()
export class UserService{
    constructor(@InjectModel(Users.name)
    private readonly userModel: Model<UserDocument>){}


    //Hàm insert vào database
    async insert(requestDTO: UserInsertRequestDTO):Promise<UserInsertResponseDTO>{
        const user = new this.userModel(requestDTO)
        await user.save();
        const responseDTO :  UserInsertResponseDTO = {
            status : true,
            message : 'Insert product successfully',
        }
        return responseDTO;
    }
}