import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { OrderType } from "../models/OrderModel";
import { IOrderProps } from "../models/props/IOrderProps";
import { Button, Modal, Table } from "antd";
import OrderQueue from "./OrderQueue";
import { ProductModel } from "../models/ProductModel";
import { Link } from "react-router-dom";

const OrderSetting = (props: IOrderProps) => {
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
        console.log(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: any) => <Link to={`/product-setting/${record.key}`}>{text}</Link>,
        },
        {
            title: 'Tác vụ',
            render: () => <Button type="primary">Thêm</Button>
        }
    ]

    return (
        <div className="p-4">
            <div className="bg-white rounded p-4">
                <Title level={3}>{props.orderType === OrderType.Import ? 'Nhập kho' : 'Xuất kho'}</Title>
                <div className="mt-4">
                    <Title level={4} className="mb-2">Danh sách sản phẩm</Title>
                    <div className="text-right">
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

                        <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} />

                    </div>
                </div>
                <Button className="mr-2">Hủy</Button>
                <Button type="primary" danger={props.orderType === OrderType.Import}>Xác nhận</Button>
            </div>
        </div>
    )
}

export default OrderSetting