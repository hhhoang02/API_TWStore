import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "./order.schema";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderCpanelController } from "./order.cpanel.controller";
import { ProductModule } from "src/product/product.module";





@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Order.name, schema: OrderSchema },
        ]),
        ProductModule
    ],
    controllers: [OrderController, OrderCpanelController],
    providers: [OrderService],
})
export class OrderModule { }