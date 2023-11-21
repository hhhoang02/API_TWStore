import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventSchema } from "./event.schema";
import { UserController } from "src/user/user.controller";
import { EventService } from "./event.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Event.name, schema: EventSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [EventService],
})
export class EventModule { }