import { OrderType } from "../OrderModel";

interface IOrderProps {
    orderType: OrderType;
}

interface IOrderQueueProps extends IOrderProps {
    setProducts: any
}

export type { IOrderProps, IOrderQueueProps }