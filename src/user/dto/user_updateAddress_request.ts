import { Types } from "mongoose";

export class UserAddressDTO {
    _id: Types.ObjectId;
    typeUpdate: "insert" | "delete";
    position: number;
    emailUser: string;
    city: string;
    district: string;
    ward: string;
    street: string;
}