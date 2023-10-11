import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Branch } from './branch.entity';
import { BranchDeleteRequestDTO } from './dto/branch_delete_request';
import { BranchAddRequestDTO } from './dto/branch_add_request';
import { BranchUpdateRequestDTO } from './dto/branch_update_request.dto';
import { BranchUpdateResponseDTO } from './dto/branch_update_response.dto';
import { BranchGetResponseDTO } from './dto/branch_get_response.dto';
import { BranchDeleteResponseDTO } from './dto/branch_delete_response';
import { BranchAddResponseDTO } from './dto/branch_add_response';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel(Branch.name)
    private readonly branchModel: Model<Branch>,
  ) {}

  //Hàm insert vào database
 async addBranch(
    requestDTO: BranchAddRequestDTO,
  ): Promise<BranchAddResponseDTO> {
    const type = new this.branchModel(requestDTO);
    await type.save();
    const responseDTO: BranchAddResponseDTO = {
      status: true,
      message: 'Insert category successfully',
    };
    return responseDTO;
  }

  async deleteBranch(id: string): Promise<BranchDeleteResponseDTO> {
    try {
      await this.branchModel.findByIdAndDelete(id);
      const responseDTO: BranchDeleteResponseDTO = {
        status: true,
        message: 'Xóa thành công',
      };
      return responseDTO;
    } catch (error: any) {
      console.log(error);
      const responseDTO: BranchDeleteResponseDTO = {
        status: false,
        message: error.message,
      };
      return responseDTO;
    }
  }

  //Cập nhật sản phẩm
  async updateBranch(
    id: string,
    requestDTO: BranchUpdateRequestDTO,
  ): Promise<BranchUpdateResponseDTO> {
    try {
      const category = await this.branchModel.findById(id);
      if (!category) {
        throw new Error('Product not found');
      }
      const { name} = requestDTO;
      category.name = name ? name : category.name;
      await category.save();
      const responseDTO: BranchUpdateResponseDTO = {
        status: true,
        message: 'Cập nhật thành công',
      };
      return responseDTO;
    } catch (error: any) {
      console.log(error);
      const responseDTO: BranchUpdateResponseDTO = {
        status: false,
        message: error.message,
      };
      return responseDTO;
    }
  }

  async getAllBranch(): Promise<BranchGetResponseDTO> {
    const category = await this.branchModel.find(); //Select * from products
    const responseDTO: BranchGetResponseDTO = {
      status: true,
      message: 'Get category successfully',
      data: category,
    };
    return responseDTO;
  }
}
