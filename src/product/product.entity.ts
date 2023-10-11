import { Category } from "src/category/category.entity";
import { Users } from "src/user/user.entity";
import { ManyToOne } from "typeorm";
export class Product{
    name: string;
    image: string;
    size: string | number;
    price: number;
    color: string;
    cmt:{
        _id: string;
        img: string;
        content: string;
        evaluate: string;
        dateCmt: string;
        user: Users
    };
    branchs:{
        _id: string;
        name: string;
    };
    evaluate: number;
    description: string;
    type: string;
}