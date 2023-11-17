
import { Controller, Get, Render, Res} from "@nestjs/common";
import { ProductService } from "./product.service";
import { UserInfoService } from 'src/userInfo/user.service';

@Controller('productsCpanel')
export class ProductsCpanelController {
    constructor(
        private readonly productService: ProductService
    ) { }


    @Get('quanlysanpham')
    @Render('quanlysanpham')
    async quanlysanpham(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('quanlydonhang')
    @Render('quanlydonhang')
    async quanlydonhang(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('quanlysukien')
    @Render('quanlysukien')
    async quanlysukien(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
    @Get('quanlythanhtoan')
    @Render('quanlythanhtoan')
    async quanlythanhtoan(@Res() res: Response) {
        return {
            message: 'Hello'
        }
    }
}
