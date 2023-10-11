import { Branch } from "../branch.entity";
export class BranchGetResponseDTO{
    status: Boolean;
    message: string;
    //Data trả về 1 mảng các product
    data: Branch[];
}




