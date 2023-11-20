import { Body, Controller, Get, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { BrandService } from "./brand.service";
import { Response } from "express";
import { BrandAddRequestDTO } from "./dto/brand_add_request";
import { BrandDeleteRequestDTO } from "./dto/brand_delete_request";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express/multer";

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) { }

    @Post('addBrand')
    async AddBrand(@Body() body: BrandAddRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.brandService.AddBrand(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);

        }
    }

    @Get('getAllBrand')
    async GetAllBrand(@Res() res: Response) {
        try {
            const responseDTO = await this.brandService.GetAllBrand();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);

        }
    }
    @Post('deleteBrand')
    async DeleteBrand(@Body() body: BrandDeleteRequestDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.brandService.DeleteBrand(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}