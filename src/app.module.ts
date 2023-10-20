import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { BranchModule } from './branch/branch.module';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [

    MongooseModule.forRoot('mongodb+srv://admin:haunho@cluster0.3oqlz8r.mongodb.net/TWStore?retryWrites=true&w=majority'),
    UserModule, ProductModule, OrderModule, CommentModule, BranchModule, CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
