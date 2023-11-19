import { Body, Controller, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { BannerService } from "./banner.service";
import { BannerInsertDTO } from "./dto/banner_insert_request";
import { Response } from "express";

@Controller('banner')
export class BannerController {
    constructor(private readonly bannerService: BannerService) { }

    @Put('updateBanner')
    async UpdateBanner(@Body() body: BannerInsertDTO, @Res() res: Response) {
        const responseDTO = await this.bannerService.updateBanner(body);
        return res.status(HttpStatus.OK).json(responseDTO);
    }
}
