import { Controller, Get, Post, Body, Param, Query, Res, HttpStatus, HttpCode, Render, Delete } from '@nestjs/common';
import { Response, Request } from 'express';
import { BranchService } from './branch.service';
import { BranchDeleteRequestDTO } from './dto/branch_delete_request';
import { BranchAddRequestDTO } from './dto/branch_add_request';
import { BranchUpdateRequestDTO } from './dto/branch_update_request.dto';

//Url: http://localhost:3000/branch
@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }


     //Url: http://localhost:3000/category/addCategory
     @Post('addBranch')
     async addCategory(@Body() body: BranchAddRequestDTO, @Res() res: any) {
         try {
             const responseDTO = await this.branchService.addBranch(body);
             return res.status(HttpStatus.OK).json(responseDTO);
         } catch (error: any) {
             return res.status(HttpStatus.BAD_REQUEST).json(error);
         }
     }
 
 
     @Post('deleteBranch/:id')
     async delete(@Param('id') id : string, @Body() body: BranchDeleteRequestDTO, @Res() res: Response){
         try {
             const responseDTO = await this.branchService.deleteBranch(id);
             return res.status(HttpStatus.OK).json(responseDTO);
         } catch (error) {
             return res.status(HttpStatus.BAD_REQUEST).json(error);
         }
     }
 
     //Cập nhật sản phẩm
     //Url: http://localhost:3000/product/update/123
     @Post('updateBranch/:id')
     async update(@Param('id') id : string, @Body() body: BranchUpdateRequestDTO, @Res() res: Response){
         try {
             const responseDTO = await this.branchService.updateBranch(id, body);
             return res.status(HttpStatus.OK).json(responseDTO);
         } catch (error) {
             return res.status(HttpStatus.BAD_REQUEST).json(error);
         }
     }
 
     //Lấy sản phẩm
     //Url: http://localhost:3000/category/getAllCategory
     @Get('getAllBranch')
     async getAllCategory(@Res() res:Response){
         try {
             //Đọc tất cả từ query string
             const responseDTO = await this.branchService.getAllBranch();
             return res.status(HttpStatus.OK).json(responseDTO);
         } catch (error:any) {
             return res.status(HttpStatus.BAD_REQUEST).json(error);
         }
     }

     


}
