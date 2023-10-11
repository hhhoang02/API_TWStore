import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import {BranchModule} from './branch/branch.module';

@Module({
  imports: [

   MongooseModule.forRoot('mongodb+srv://hhhoang210702:221254829@cluster0.vkmewbz.mongodb.net/TWStore?retryWrites=true&w=majority'),
   UserModule,  CategoryModule, BranchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
