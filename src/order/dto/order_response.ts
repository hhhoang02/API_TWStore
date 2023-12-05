import { Order } from "../order.schema";

export class OrderResponseDTO {
    status: boolean;
    message: string;
    order: Order
}