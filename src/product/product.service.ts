import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { ProductInsertDTO } from "./dto/product_insert_request";
import { ProductResponseDTO } from "./dto/product_response";
import { ProductUpdateDTO } from "./dto/product_update_request";

@Injectable()
export class UserService {
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,) { }

    async AddProduct(requestDTO: ProductInsertDTO): Promise<ProductResponseDTO> {
        try {
            const { productName, price, quantity, branch, image, size, description, style, color, category, grossRating, comment } = requestDTO;
            const newProduct = new this.productModel({
                productName,
                price,
                quantity,
                branch,
                image,
                size,
                description,
                style,
                color,
                category,
                grossRating,
                comment
            });
            await newProduct.save();
            return {
                status: true,
                message: 'Add product successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Add product failed',
            }
        }
    }
    async UpdateProduct(responseDTO: ProductUpdateDTO): Promise<ProductResponseDTO> {
        try {
            const { _id } = responseDTO;
            const { productName, price, quantity, branch, image, size, description, style, color, category, grossRating, comment } = responseDTO;
            const product = await this.productModel.findById(_id);
            if (!product) return {
                status: false,
                message: 'Product not found',
            };
            product.productName = productName ? productName : product.productName;
            product.price = price ? price : product.price;
            product.quantity = quantity ? quantity : product.quantity;
            product.branch = branch ? branch : product.branch;
            product.image = image ? image : product.image;
            product.size = size ? size : product.size;
            product.description = description ? description : product.description;
            product.style = style ? style : product.style;
            product.color = color ? color : product.color;
            product.categoryID = category ? category : product.categoryID;
            product.grossRating = grossRating ? grossRating : product.grossRating;
            product.comment = comment ? comment : product.comment;

            await product.save();
            return {
                status: true,
                message: 'Update product successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Update product failed',
            }

        }
    }
    async DeleteProduct(responseDTO: ProductUpdateDTO): Promise<ProductResponseDTO> {
        try {
            const { _id } = responseDTO;
            const product = await this.productModel.findById(_id);
            if (!product) return {
                status: false,
                message: 'Product not found',
            };
            await product.remove();
            return {
                status: true,
                message: 'Delete product successfully',
            }
        } catch (error) {
            return {
                status: false,
                message: 'Delete product failed',
            }
        }
    }

}
