import { Button, Table, Tag } from 'antd';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Order } from '../models/entities/Order';
import axios from 'axios';
import {
    PlusCircleOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { OrderType } from '../models/OrderModel';

const OrderList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [orders, setOrders] = useState<Order[]>();

    useEffect(() => {
        axios.get('/api/order/get-list').then(response => {
            setOrders(response.data);
        })
    }, [])

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            render: (text: string, record: Order) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate'
        },
        {
            title: 'Loại',
            dataIndex: 'orderType',
            render: (orderType: OrderType) => (
                <Tag color={orderType === OrderType.Import ? 'volcano' : 'geekblue'}>{orderType === OrderType.Import ? 'Nhập kho' : 'Xuất kho'}</Tag>
            )
        },
        {
            title: 'Tác vụ',
            render: (record: Order) => <Button type="primary" danger onClick={() => setOrders(orders?.filter(x => x.id !== record.id))} icon={<DeleteOutlined />}></Button>
        }
    ]

    return (
        <div className="p-4">
            <div className="text-right mb-3">
                <Link to="/order-setting/export" className="mr-2"><Button type="primary" icon={<PlusCircleOutlined />}>Xuất kho</Button></Link>
                <Link to="/order-setting/import"><Button type="primary" danger icon={<PlusCircleOutlined />}>Nhập kho</Button></Link>
            </div>
            <div className="p-4 bg-white">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowSelection={rowSelection}
                    pagination={{ pageSize: 9 }}
                    rowKey={(record: Order) => record.id}
                />
            </div>
        </div>
    )
}

export default OrderList