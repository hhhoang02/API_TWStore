import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [

   MongooseModule.forRoot('mongodb+srv://admin:haunho@cluster0.3oqlz8r.mongodb.net/TWStore?retryWrites=true&w=majority'),
   UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
