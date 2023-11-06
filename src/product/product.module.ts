import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./product.schema";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Category, CategorySchema } from "src/category/category.schema";





@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }