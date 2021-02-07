import { Dispatch, SetStateAction } from "react";
import { OrderType } from "../OrderModel";
import { ProductModel } from "../ProductModel";

interface IOrderProps {
    orderType: OrderType;
}

interface IOrderQueueProps extends IOrderProps {
    setProducts: Dispatch<SetStateAction<ProductModel[]>>
}

export type { IOrderProps, IOrderQueueProps }