import { Product } from '../entities/Product';

export interface ProductOrder extends Product {
    quantity: number;
    price: number;
}