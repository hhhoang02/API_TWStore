import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';
import { UserInfoModule } from './userInfo/user.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { PromotionModule } from './promotion/promotion.module';
import { BannerModule } from './banner/banner.module';


@Module({
  imports: [

    MongooseModule.forRoot('mongodb+srv://admin:haunho@cluster0.3oqlz8r.mongodb.net/TWStore?retryWrites=true&w=majority'),
    UserModule, UserInfoModule, OrderModule,CommentModule, BranchModule, CategoryModule, ProductModule, PromotionModule,
    OrderModule,BannerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
