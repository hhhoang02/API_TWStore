import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Render, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { Types } from "mongoose";
import { PaymentService } from "./payment.service";

@Controller('paymentCpanel')
export class PaymentCpanelController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get('quanlythanhtoan')
    @Render('quanlythanhtoan')
    async quanlyPaymentMethod(@Res() res: Response) {
        try {
            const payment = await this.paymentService.getAllPaymentMethod();
            return { payment: payment.data };
        } catch (error) {
        }
    }

    @Get('addPaymentMethod')
    @Render('addPaymentMethod')
    async AddPaymentRender(@Res() res: Response) {
        try {
            return {};
        } catch (error) {
            return error;
        }
    }
    @Post('addPaymentMethod')
    async addPaymentMethod(@Body() body: any, @Res() res: Response) {
        try {
            await this.paymentService.addPaymentMethod(body);
            return res.redirect('/paymentCpanel/quanlypaymentmethod');
        } catch (error) {
            console.log(error);
        }
    }
    @Delete('deletePayment/:_id')
    async deletePayment(@Param() _id: Types.ObjectId, @Res() res: Response) {
        try {
            await this.paymentService.deletePaymentMethod(_id);
            return res.json({ result: true });
        } catch (error) {
            console.log(error);
        }
    }
}
