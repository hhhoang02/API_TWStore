export class UserAddressDTO {
    typeUpdate: "insert" | "delete"
    key: number;
    emailUser: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    phone: string;
}