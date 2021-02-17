import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, message, Tabs, Col, Row, Empty } from 'antd';
import { Link } from 'react-router-dom';
import { VndFormat } from "../helpers/formatHelper";
import axios from 'axios';
import Title from 'antd/lib/typography/Title';
import {
    PlusCircleOutlined,
    DeleteOutlined,
    FolderOutlined,
    SettingOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const AccountList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        axios.get('/api/account/get-list-account').then(response => {
            setAccounts(response.data);
        })
    }, [])

    function handleRemove(id) {
        axios.post(`/api/account/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setAccounts(accounts.filter(x => x.id !== id))
                message.info('Xóa nhân viên thành công!');
            } else {
                response.data.errors.forEach(value => {
                    message.error(value)
                })
            }
        });
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            render: (text, record) => <Link to={`/account-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="small">
                    <Link to={`/account-setting/${record.id}`}>
                        <Button type="primary" icon={<FolderOutlined />}></Button>
                    </Link>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="danger" icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onSelectChange = (e) => {
        setSelectedRowKeys(e)
        console.log(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="p-4">

            <div className="mb-3">
                <Row gutter={16}>
                    <Col span={4}>
                        <div className="bg-white p-4">
                            <div className="font-bold">Tổng lương/tháng</div>
                            <div>{VndFormat(accounts.reduce((a, b) => a + (b['salary'] || 0), 0))}</div>
                        </div>
                    </Col>
                    <Col span={4}>
                        <div className="bg-white p-4">
                            <div className="font-bold">Nhân viên</div>
                            <div>{accounts.length}</div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="p-4 bg-white">

                <div className="flex justify-between py-2 mb-2">
                    <Title level={4}>Danh sách nhân viên</Title>
                    <div>
                        <Link to="/account-add" className="mr-2"><Button type="primary" icon={<PlusCircleOutlined />}>Thêm nhân viên</Button></Link>
                        <Link to="/role-list"><Button type="primary" danger icon={<SettingOutlined />}>Quyền</Button></Link>
                    </div>
                </div>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Đang hoạt động" key="1">
                        <Table columns={columns} dataSource={accounts} rowSelection={rowSelection} pagination={{ pageSize: 5 }} rowKey="id" />
                    </TabPane>
                    <TabPane tab="Đã nghỉ" key="2">
                        <Empty />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default AccountList