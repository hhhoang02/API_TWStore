import { ProductGetByIdCategoryRequestDTO } from './dto/product_getProductbyIdCategory_request';
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { ProductInsertDTO } from "./dto/product_insert_request";
import { ProductResponseDTO } from "./dto/product_response";
import { ProductUpdateDTO } from "./dto/product_update_request";
import { ProductGetResponseDTO } from "./dto/product_get_response";
import { ProductGetbyIdDTO } from "./dto/product_getProductbyID_request";
import { ProductGetByIdBranchRequestDTO } from './dto/product_getProductbyIdBranch_request';
import { ProductGetByIdPromotionRequestDTO } from './dto/product_getProductbyIdPromotion_request';


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,

    ) { }

    async addProduct(requestDTO: ProductInsertDTO): Promise<ProductResponseDTO> {
        try {
            const { productName, price, quantity, brand, image, size, description, sale, colorID, categoryID } = requestDTO;
            console.log(requestDTO);

            const newProduct = new this.productModel({
                image, 
                productName,
                price,
                quantity,
                brand,
                size,
                description,
                sale,
                colorID,
                categoryID,
            });
            await newProduct.save();
            return {
                status: true,
                message: 'Add product successfully',
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Add product failed',
            }
        }
    }
    async updateProduct(requestDTO: ProductUpdateDTO): Promise<ProductResponseDTO> {
        try {
            const { _id } = requestDTO;
            const { productName, price, quantity, brand, image, size, description, sale, colorID, categoryID } = requestDTO;
            const product = await this.productModel.findById(_id);
            if (!product) return {
                status: false,
                message: 'Product not found',
            };
            product.image = image ? image : product.image;
            product.productName = productName ? productName : product.productName;
            product.price = price ? price : product.price;
            product.quantity = quantity ? quantity : product.quantity;
            product.brand = brand ? brand : product.brand;
            product.size = size ? product.size : product.size;
            product.description = description ? description : product.description;
            product.sale = sale ? sale : product.sale;
            product.colorID = colorID ? colorID : product.colorID;
            product.categoryID = categoryID ? categoryID : product.categoryID;

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
    async deleteProduct(requestDTO: ProductUpdateDTO): Promise<ProductResponseDTO> {
        try {
            const _id = requestDTO;
            const product = await this.productModel.findByIdAndDelete(_id);
            if (!product) return {
                status: false,
                message: 'Product not found',
            };
            return {
                status: true,
                message: 'Delete product successfully',
            }
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Delete product failed',
            }
        }
    }
    async getAllProduct(): Promise<ProductGetResponseDTO[]> {
        try {
            const product = await this.productModel.find().populate([{ path: 'brand', select: 'name' }, { path: 'categoryID', select: 'name' }]);;
            return product;
        } catch (error) {
            return
        }

    }
    async getProductById(requestDTO: ProductGetbyIdDTO): Promise<any> {
        try {
            const _id = requestDTO;

            const product = await this.productModel.findById(_id).populate([{ path: 'brand', select: 'name' }, { path: 'categoryID', select: 'name' }]);
            console.log(product);

            if (!product) return
            return product;
        } catch (error) {
            console.log(error);

        }
    }

    async getProductbyIdCategory(requestDTO: ProductGetByIdCategoryRequestDTO): Promise<any> {
        try {
            const _id = requestDTO;
            const product = await this.productModel.find({ categoryID: _id }).populate([{ path: 'categoryID', select: 'name' }, { path: 'branch', select: 'name' }]);
            return product
        } catch (error) {
            return
        }
    }

    async getProductbyIdBranch(requestDTO: ProductGetByIdBranchRequestDTO): Promise<any> {
        try {
            const _id = requestDTO;
            const product = await this.productModel.find({ branch: _id }).populate([{ path: 'branch', select: 'name' }, { path: 'categoryID', select: 'name' }]);
            return product
        } catch (error) {
            return
        }
    }

}
