import { Address } from "src/address/address.schema";
import { AddressInter } from "./user.schema";

export class Users {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    address: AddressInter | null
}