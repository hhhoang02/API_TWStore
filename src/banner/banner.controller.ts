import { Body, Controller, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BannerService } from "./banner.service";
import { BannerInsertDTO } from "./dto/banner_insert_request";
import { Response } from "express";

@Controller('banner')
export class BannerController {
    constructor(private readonly bannerService: BannerService) { }

    @Put('updateBanner')
    async UpdateBanner(@Body() body: BannerInsertDTO, @Res() res: Response) {
        try {
            const responseDTO = await this.bannerService.updateBanner(body);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
    @Get('getAllBanner')
    async GetAllBanner(@Res() res: Response) {
        try {
            const responseDTO = await this.bannerService.getAllBanner();
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}
