import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Branch, BranchSchema } from "./branch.schema";





@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Branch.name, schema: BranchSchema },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class BranchModule { }