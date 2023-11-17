import { InjectModel } from "@nestjs/mongoose";
import { Banner, BannerDocument } from "./banner.schema";
import { Model } from "mongoose";
import { BannerInsertDTO } from "./dto/banner_insert_request";
import { BannerResponseDTO } from "./dto/promotion_response";

export class BannerService {
    constructor(
        @InjectModel(Banner.name) 
        private readonly bannerModel: Model<BannerDocument>,
    ) { }

    async addPromotion(requestDTO: BannerInsertDTO): Promise<BannerResponseDTO> {
        try {
            const { image,position} = requestDTO;
            
        } catch (error) {
            console.log(error);
    
            return {
                status: false,
                message: 'Update address failed',
            }
        }
    }
    
}