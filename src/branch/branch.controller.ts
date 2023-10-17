import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { BranchService } from "./branch.service";
import { Response } from "express";
import { BranchAddRequestDTO } from "./dto/branch_add_request";
import { BranchDeleteRequestDTO } from "./dto/branch_delete_request";

@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Post('addBranch')
    async AddBranch(@Body() body: BranchAddRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.branchService.AddBranch(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);

        }
    }

    @Get('getAllBranch')
    async GetAllBranch(@Res() res: Response) {
        try {
            const responseDTO = await this.branchService.GetAllBranch();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);

        }
    }
    @Post('deleteBranch')
    async DeleteBranch(@Body() body: BranchDeleteRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.branchService.DeleteBranch(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}