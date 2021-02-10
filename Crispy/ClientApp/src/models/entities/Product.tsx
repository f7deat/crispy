import { BaseEntity } from "./BaseEntity";

export interface Product extends BaseEntity {
    name: string;
    unitPrice: number;
    salePrice: number;
    unitStock: number;
}