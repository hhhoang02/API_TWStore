import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CategoryAddResponseDTO } from './dto/category_add_response';
import { CategoryAddRequestDTO } from './dto/category_add_request';
import { CategoryDeleteResponseDTO } from './dto/category_delete_response';
import { CategorySchema, Category } from './category.schema';
import { log } from 'console';
import { CategoryGetResponseDTO } from './dto/category_get_response.dto';
import { CategoryUpdateResponseDTO } from './dto/category_update_response.dto';
import { CategoryUpdateRequestDTO } from './dto/category_update_request.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  //Hàm insert vào database
  async addCategory(
    requestDTO: CategoryAddRequestDTO,
  ): Promise<CategoryAddResponseDTO> {
    const type = new this.categoryModel(requestDTO);
    await type.save();
    const responseDTO: CategoryAddResponseDTO = {
      status: true,
      message: 'Insert category successfully',
    };
    return responseDTO;
  }

  async deleteCategory(id: string): Promise<CategoryDeleteResponseDTO> {
    try {
      await this.categoryModel.findByIdAndDelete(id);
      const responseDTO: CategoryDeleteResponseDTO = {
        status: true,
        message: 'Xóa thành công',
      };
      return responseDTO;
    } catch (error: any) {
      console.log(error);
      const responseDTO: CategoryDeleteResponseDTO = {
        status: false,
        message: error.message,
      };
      return responseDTO;
    }
  }

  //Cập nhật sản phẩm
  async updateCategory(
    id: string,
    requestDTO: CategoryUpdateRequestDTO,
  ): Promise<CategoryUpdateResponseDTO> {
    try {
      const category = await this.categoryModel.findById(id);
      if (!category) {
        throw new Error('Product not found');
      }
      const { name, type } = requestDTO;
      category.name = name ? name : category.name;
      category.type = type ? type : category.type;
      await category.save();
      const responseDTO: CategoryUpdateResponseDTO = {
        status: true,
        message: 'Cập nhật thành công',
      };
      return responseDTO;
    } catch (error: any) {
      console.log(error);
      const responseDTO: CategoryUpdateResponseDTO = {
        status: false,
        message: error.message,
      };
      return responseDTO;
    }
  }

  async getAllCategory(): Promise<CategoryGetResponseDTO> {
    const category = await this.categoryModel.find(); //Select * from products
    const responseDTO: CategoryGetResponseDTO = {
      status: true,
      message: 'Get category successfully',
      data: category,
    };
    return responseDTO;
  }
}
