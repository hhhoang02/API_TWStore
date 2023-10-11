import { Users } from "src/user/user.entity";

export class Product{
    name: string;
    image: string;
    size: string | number;
    price: number;
    color: string;
    cmt:{
        _id: string;
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