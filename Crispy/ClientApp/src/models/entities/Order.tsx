import { OrderType } from "../OrderModel";

export interface Order {
    id: string;
    orderType: OrderType;
    createdDate: Date;
    createdBy: string;
}