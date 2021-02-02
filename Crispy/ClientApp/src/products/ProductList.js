import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    PlusCircleOutlined,
    DeleteOutlined,
    FolderOutlined,
    EditOutlined
} from '@ant-design/icons';

const ProductList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/product/list-all').then(response => {
            let remap = response.data.map(x => {
                return {
                    key: x.id,
                    name: x.name,
                }
            })
            setProducts(remap);
        })
    }, [])

    const handleDelete = (id) => {
        console.log(id);
    }

    const columns = [
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            render: (text, record) => <Link to={`/account-setting/${record.key}`}>{text}</Link>,
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="small">
                    <Link to={`/product-center/${record.key}`}>
                        <Button type="primary" icon={<FolderOutlined />}></Button>
                    </Link>
                    <Link to={`/product-setting/${record.key}`}>
                        <Button type="primary" icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.key)}
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
                <Link to="/product-setting"><Button type="primary" icon={<PlusCircleOutlined />}>Thêm sản phẩm</Button></Link>
            </div>
            <div className="bg-white p-4">
                <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} />
            </div>
        </div>
    )
}

export default ProductList