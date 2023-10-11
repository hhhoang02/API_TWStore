import { Category } from './../category.schema';
export class CategoryGetResponseDTO{
    status: Boolean;
    message: string;
    //Data trả về 1 mảng các product
    data: Category[];
}




