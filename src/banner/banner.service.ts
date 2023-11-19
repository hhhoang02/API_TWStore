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

    async updateBanner(requestDTO: BannerInsertDTO): Promise<BannerResponseDTO> {
        try {
            const { image, position, title, typeUpdate } = requestDTO;
            if (typeUpdate == 'insert') {
                const banner = new this.bannerModel({ title, image, position });
                return {
                    status: true,
                    message: 'Insert banner success' + banner,
                };
            }
            const banner = await this.bannerModel.findOneAndDelete({ position });
            return {
                status: true,
                message: 'Delete banner success',
            };
        } catch (error) {
            console.log(error);
            return {
                status: false,
                message: 'Update address failed',
            }
        }
    }

}