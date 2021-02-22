import { Button, message, Popconfirm, Space, Table } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

export const AccountTable = (props: any) =>
{
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    function handleRemove(id: string) {
        axios.post(`/api/account/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                props.setAccounts(props.accounts.filter((x: any) => x.id !== id))
                message.info('Xóa nhân viên thành công!');
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value)
                })
            }
        });
    }

    const onSelectChange = (e) => {
        setSelectedRowKeys(e)
        console.log(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (text: string, record: any) => <Link to={`/account-setting/${record.id}`}>{text}</Link>,
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
            render: (text: string, record: any) => (
                <Space size="small">
                    <Link to={`/account-setting/${record.id}`}>
                        <Button type="primary" icon={<FolderOutlined />}></Button>
                    </Link>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleRemove(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={props.accounts} rowSelection={rowSelection} pagination={{ pageSize: 5 }} rowKey="id" />
        </div>
    )
}