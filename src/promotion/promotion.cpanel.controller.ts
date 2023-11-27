import { Body, Controller, Delete, Get, Param, Post, Render, Res } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { Response } from 'express';
import { Types } from "mongoose";
import { PromotionDeleteRequestDTO } from "./dto/promotion_delete_request";
import { PromotionInsertDTO } from "./dto/promotion_insert_request";
@Controller('promotionsCpanel')
export class PromotionCpanelController {
    constructor(private readonly promotionService: PromotionService) { }
    @Get('quanlymagiamgia')
    @Render('quanlymagiamgia')
    async quanlymagiamgia(@Res() res: Response) {
      try {
        const promotions = await this.promotionService.getAllPromotion();
        return { promotions };
    } catch (error) {
    }
    }

    @Get('addPromotion')
    @Render('addPromotion')
    async AddPromotion(@Res() res: Response) {
        try {
            return {};
        } catch (error) {
            return error;
        }
    }
    @Post('addPromotion')
    async addPromotion(@Body() body: PromotionInsertDTO, @Res() res: Response) {
        try {
            await this.promotionService.addPromotion(body);
            return res.redirect('/promotionsCpanel/quanlymagiamgia');
        } catch (error) {
            console.log(error);
        }
    }
    @Delete('quanlymagiamgia/:_id/delete')
    async deletePromotion(@Param() _id: PromotionDeleteRequestDTO, @Res() res: Response) {
        try {
            await this.promotionService.DeletePromotion(_id);
            return res.json({ result: true });
        } catch (error) {
            console.log(error);
        }
    }
}
