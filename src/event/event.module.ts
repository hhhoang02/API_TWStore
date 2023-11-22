import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./event.schema";
import { UserController } from "src/user/user.controller";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
        ]),
    ],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule { }