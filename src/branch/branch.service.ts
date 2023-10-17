import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Branch, BranchDocument } from "./branch.schema";
import { Model } from "mongoose";
import { BranchGetAllResponseDTO } from "./dto/branch_getAll_response";
import { BranchAddRequestDTO } from "./dto/branch_add_request";
import { BranchResponseDTO } from "./dto/branch_response";
import { BranchDeleteRequestDTO } from "./dto/branch_delete_request";

@Injectable()
export class BranchService {
    constructor(@InjectModel(Branch.name)
    private readonly branchModel: Model<BranchDocument>) { }
    async AddBranch(requestDTO: BranchAddRequestDTO): Promise<BranchResponseDTO> {
        try {
            const { name } = requestDTO;
            const branch = await this.branchModel.findOne({ name });
            if (branch) {
                return {
                    status: false,
                    message: 'Branch already exists',
                }
            }
            console.log(name);

            const newBranch = new this.branchModel({ name });
            await newBranch.save();
            return {
                status: true,
                message: 'Add branch successfully',
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Add branch failed',
            }
        }
    }
    async GetAllBranch(): Promise<BranchGetAllResponseDTO[]> {
        try {
            const responseDTO = await this.branchModel.find();
            return responseDTO;
        } catch (error) {
            return error;
        }
    }
    async DeleteBranch(requestDTO: BranchDeleteRequestDTO): Promise<BranchResponseDTO> {
        try {
            const { _id } = requestDTO;
            const branch = await this.branchModel.findById(_id);
            if (!branch) return {
                status: false,
                message: 'Branch not found',
            };
            await this.branchModel.findByIdAndDelete(_id);
            return {
                status: true,
                message: 'Delete branch successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Delete branch failed',
            }
        }
    }


}