import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./notifi.schema";
import { EventService } from "./notifi.service";
import { EventController } from "./notifi.controller";
import { ProductModule } from "src/product/product.module";
import { EventsCpanelController } from "./notifi.cpanel.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
        ]),
        ProductModule
    ],

    controllers: [EventController, EventsCpanelController],
    providers: [EventService ],
    exports: [EventService],
})
export class EventModule { }