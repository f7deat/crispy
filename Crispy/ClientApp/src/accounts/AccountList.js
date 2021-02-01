import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, message, Tabs } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { TabPane } = Tabs;

const AccountList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        axios.get('/api/account/get-list-account').then(response => {
            let remap = response.data.map(x => {
                return {
                    key: x.id,
                    name: x.name,
                    phoneNumber: x.phoneNumber,
                    email: x.email
                }
            })
            setAccounts(remap);
        })
    }, [])

    function handleRemove(id) {
        axios.post(`/api/account/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setAccounts(accounts.filter(x => x.key !== id))
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
            render: (text, record) => <Link to={`/account-setting/${record.key}`}>{text}</Link>,
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
                    <Link to={`/account-setting/${record.key}`}>
                        <Button type="primary" icon={<FolderOutlined />}></Button>
                    </Link>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(record.key)}
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
            <div className="text-right mb-3">
                <Link to="account-setting"><Button type="primary" icon={<PlusCircleOutlined />}>Thêm nhân viên</Button></Link>
            </div>
            <div className="p-4 bg-white">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Đang hoạt động" key="1">
                        <Table columns={columns} dataSource={accounts} rowSelection={rowSelection} pagination={{ pageSize: 9 }} />
                    </TabPane>
                    <TabPane tab="Đã nghỉ" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default AccountList