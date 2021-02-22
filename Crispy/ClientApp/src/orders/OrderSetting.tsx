import { useEffect, useState } from "react";
import * as React from 'react';
import Title from "antd/lib/typography/Title";
import { OrderType } from "../models/OrderModel";
import { IOrderProps } from "../models/props/IOrderProps";
import { Button, Empty, Input, InputNumber, message, Modal, Select, Table } from "antd";
import OrderQueue from "./OrderQueue";
import { ProductOrder } from "../models/interfaces/ProductOrder";
import { Link } from "react-router-dom";
import { VndFormat } from "../helpers/formatHelper";
import {
    DeleteOutlined,
    PlusCircleOutlined
} from '@ant-design/icons';
import axios from "axios";

const { Option } = Select;

const OrderSetting = (props: IOrderProps) => {
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState<ProductOrder[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        sumPrice();
    })

    useEffect(() => {
        axios.get('/api/account/get-list-customer').then(response => {
            setCustomers(response.data);
        })
    }, [])

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
        if (!selectedCustomer) {
            message.error('Vui lòng chọn khách hàng!');
            return;
        }
        if (products.length > 0) {
            axios.post('/api/order/add-to-cart', {
                customerId: selectedCustomer,
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

    function onChange(value: string) {
        // dropdown customer
        setSelectedCustomer(value)
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val: any) {
        console.log('search:', val);
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="p-4">
            <div className="bg-white rounded p-4">
                <Title level={3}>{props.orderType === OrderType.Import ? 'Nhập kho' : 'Xuất kho'}</Title>
                <div className="mb-4">
                    <Title level={5}>Khách hàng</Title>
                    <div className="flex">
                        <Select
                            showSearch
                            placeholder="Chọn khách hàng"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            className="mr-2 w-80"
                        >
                            {
                                customers.map((customer: any) => <Option value={customer.id} key={customer.id}>{customer.name}</Option>)
                            }
                        </Select>
                        <Button icon={<PlusCircleOutlined />} type="primary" onClick={showModal}>Thêm mới</Button>
                        <Modal title="Thêm khách hàng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Empty />
                        </Modal>
                    </div>
                </div>
                <div className="mb-4">
                    <Title level={5} className="mb-2">Danh sách sản phẩm</Title>
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