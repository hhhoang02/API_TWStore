import { Module } from "@nestjs/common";
import { Promotion, PromotionSchema } from "./promotion.schema";

import { PromotionController } from "./promotion.controller";
import { PromotionService } from "./promotion.service";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Promotion.name, schema: PromotionSchema },
        ]),
    ],
    controllers: [PromotionController],
    providers: [PromotionService],
})
export class PromotionModule { }