import { Button, Table, Tag, Popconfirm, message, DatePicker, Space } from 'antd';
import * as React from "react";
import { Link } from 'react-router-dom';
import { Order } from '../models/entities/Order';
import axios from 'axios';
import {
    PlusCircleOutlined,
    DeleteOutlined,
    FileExcelOutlined
} from '@ant-design/icons';
import { OrderType } from '../models/OrderModel';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const OrderList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [orders, setOrders] = useState<Order[]>();
    const [disabledExport, setDisabledExport] = useState<boolean>(true);

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

    const remove = (id: string) => {
        axios.post(`/api/order/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setOrders(orders?.filter(x => x.id !== id));
                message.info('Xóa thành công!');
            } else {
                message.error('Xóa thất bại!');
            }
        })
    }

    const columns = [
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            render: (text: string, record: Order) => <Link to={`/product-setting/${record.id}`}>{text}</Link>
        },
        {
            title: 'Ngày',
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
            render: (record: Order) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => remove(record.id)}
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            )
        }
    ]

    return (
        <div className="p-4">
            <Space>
                <div className="p-4 bg-white">
                    Tổng đơn xuất: {orders?.filter(x => x.orderType === OrderType.Export).length}
                </div>
                <div className="p-4 bg-white">
                    Tổng đơn nhập: {orders?.filter(x => x.orderType === OrderType.Import).length}
                </div>
            </Space>
            <div className="text-right mb-3">
                <RangePicker format="YYYY-MM-DD" onChange={() => setDisabledExport(false)} />
                <Button className="mr-2" disabled={disabledExport} onClick={() => setDisabledExport(true)}><FileExcelOutlined /> Xuất báo cáo</Button>
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