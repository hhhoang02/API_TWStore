import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "./category.schema";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CategoriesCpanelController } from "./category.cpanel.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [CategoryController, CategoriesCpanelController],
    providers: [CategoryService],
    exports: [CategoryService]
})
export class CategoryModule { }