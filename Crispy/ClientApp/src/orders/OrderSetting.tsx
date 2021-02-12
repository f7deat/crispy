import React, { useEffect, useState } from "react";
import Title from "antd/lib/typography/Title";
import { OrderType } from "../models/OrderModel";
import { IOrderProps } from "../models/props/IOrderProps";
import { Button, InputNumber, message, Modal, Table } from "antd";
import OrderQueue from "./OrderQueue";
import { ProductOrder } from "../models/interfaces/ProductOrder";
import { Link } from "react-router-dom";
import { VndFormat } from "../helpers/formatHelper";
import {
    DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const OrderSetting = (props: IOrderProps) => {
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState<ProductOrder[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        sumPrice();
        console.log(totalPrice)
    })

    function sumPrice() {
        setTotalPrice(products.reduce((a, b) => a + (b['price'] || 0), 0));
    }

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: ProductOrder) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            render: (text: number) => VndFormat(text)
        },
        {
            title: 'Số lượng',
            render: (record: ProductOrder) => <InputNumber min={1} max={props.orderType === OrderType.Export ? record.unitStock : 999999} defaultValue={record.quantity} onChange={(value) => handleChangeQuantity(value, record)} />
        },
        {
            title: 'Tác vụ',
            render: (record: ProductOrder) => <Button type="primary" danger onClick={() => setProducts(products.filter(x => x.id !== record.id))} icon={<DeleteOutlined />}></Button>
        }
    ]

    const handleConfirm = () => {
        if (products.length > 0) {
            axios.post('/api/order/add-to-cart', {
                orderType: props.orderType,
                cartItems: products
            }).then(response => {
                if (response.data.succeeded) {
                    message.info('Thao tác thành công!');
                } else {
                    message.error(response.data.error);
                }
            })
        } else {
            message.error('Bạn chưa chọn sản phẩm!');
        }
    }

    const handleChangeQuantity = (value: any, record: ProductOrder) => {
        record.quantity = Number(value);
        record.price = record.quantity * record.unitPrice;
        sumPrice();
    }

    return (
        <div className="p-4">
            <div className="bg-white rounded p-4">
                <Title level={3}>{props.orderType === OrderType.Import ? 'Nhập kho' : 'Xuất kho'}</Title>
                <div className="my-4">
                    <Title level={4} className="mb-2">Danh sách sản phẩm</Title>
                    <div className="text-right mb-2">
                        <Button type="primary" onClick={() => setVisible(true)}>Thêm sản phẩm</Button>
                        <Modal
                            title="Thêm sản phẩm"
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}
                        >
                            <OrderQueue orderType={props.orderType} setProducts={setProducts} />
                        </Modal>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={products}
                        rowSelection={rowSelection}
                        pagination={{ pageSize: 9 }}
                        rowKey={(record: ProductOrder) => record.id}
                    />
                    <div className="text-right mt-3">
                        <div className="font-bold">
                            Thành tiền
                        </div>
                        <div className="text-red-600">
                            {VndFormat(totalPrice)}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <Button className="mr-2">Hủy</Button>
                    <Button type="primary" danger={props.orderType === OrderType.Import} onClick={handleConfirm}>Xác nhận</Button>
                </div>
            </div>

        </div>
    )
}

export default OrderSetting