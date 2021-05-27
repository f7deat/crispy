import { Button, Col, Divider, Popconfirm, Row, Space, Table, Tag } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { AccountModel } from '../models/AccountModel';
import {
    CheckCircleOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { OrderType } from '../models/OrderModel';
import { Order } from '../models/entities/Order';
import moment from 'moment';

const AccountCenter = () => {

    const [account, setAccount] = useState<AccountModel>();
    const [orders, setOrders] = useState<any>();
    const [manager, setManager] = useState<any>({});

    const { id } = useParams<any>();

    useEffect(() => {
        if (id) {
            axios.get(`/api/account/get/${id}`).then((response) => {
                setAccount(response.data);
            })
        } else {
            axios.get('/api/account/get/0').then((response) => {
                setAccount(response.data);
            })
        }
        axios.get(`/api/order/get-orders-in-user/${id}`).then(response => {
            setOrders(response.data);
        })

        axios.get(`/api/account/get-manager/${id}`).then(response => {
            setManager(response.data);
        })

    }, [id])

    const columns = [
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
                    okText="Xác nhận"
                    cancelText="Hủy"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            )
        }
    ]

    return (
        <Row>
            <Col span={7} className="p-4">
                <Content className="bg-white p-4">
                    <div className="flex justify-center mb-4 py-4">
                        <img alt="" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" width={104} height={104} />
                    </div>
                    <div className="mb-4 text-center">
                        <Space>
                            <Button>Theo dõi</Button>
                            <Button type="primary"><Link to={`/account-setting/${account?.id}`}>Chỉnh sửa</Link></Button>
                        </Space>
                    </div>
                    <div className="text-center text-lg font-bold mb-4">{account?.name}</div>
                    <div className="mb-2">
                        Ngày sinh: {moment(account?.dateOfBirth).format('DD/MM/YYYY')}
                    </div>
                    <div className="mb-2">
                        Số điện thoại: {account?.phoneNumber} {account?.phoneNumberConfirmed ? <CheckCircleOutlined className="text-green-500 ml-2" /> : <CheckCircleOutlined className="ml-2" />}
                    </div>
                    <div className="mb-2">
                        Email: {account?.email} {account?.emailConfirmed ? <CheckCircleOutlined className="text-green-500 ml-2" /> : <CheckCircleOutlined className="ml-2" />}
                    </div>
                    <div className="mb-2">
                        Quản lý: {JSON.stringify(manager)}
                    </div>
                </Content>
            </Col>
            <Col span={17} className="p-4">
                <Content className="bg-white p-4">
                    <Title level={3}>Hoạt động</Title>
                    <Divider />
                    <Table
                        columns={columns}
                        dataSource={orders}
                        rowSelection={{}}
                        pagination={{ pageSize: 9 }}
                        rowKey={(record: Order) => record.id}
                    />
                </Content>
            </Col>
        </Row>
    )
}
export default AccountCenter