import React, { Key, useState } from "react";
import Title from "antd/lib/typography/Title";
import { OrderType } from "../models/OrderModel";
import { IOrderProps } from "../models/props/IOrderProps";
import { Button, InputNumber, Modal, Table } from "antd";
import OrderQueue from "./OrderQueue";
import { Product } from "../models/entities/Product";
import { Link } from "react-router-dom";
import { VndFormat } from "../helpers/formatHelper";

const OrderSetting = (props: IOrderProps) => {
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    function changeQuantity(quantity: Key, id: string) {
        console.log(quantity)
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: Product) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            render: (text: number) => VndFormat(text)
        },
        {
            title: 'Số lượng',
            dataIndex: 'unitStock',
            render: (text: number, record: Product) => <InputNumber min={0} max={text} defaultValue={1} onChange={(e: Key) => changeQuantity(e, record.id)} />
        },
        {
            title: 'Tác vụ',
            render: (record: Product) => (
                <div>
                    <Button type="primary" danger onClick={() => setProducts(products.filter(x => x.id !== record.id))}>Xóa</Button>
                </div>
            )
        }
    ]

    const handleChange = () => {

        console.log(products)
    }

    const handleConfirm = () => {

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
                        onChange={handleChange} rowKey={(record: Product) => record.id}
                    />
                    <div className="text-right mt-3">
                        <div className="font-bold">
                            Thành tiền
                        </div>
                        <div className="text-red-600">
                            {VndFormat(products.reduce((a, b) => a + (b['unitPrice'] || 0), 0))}
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