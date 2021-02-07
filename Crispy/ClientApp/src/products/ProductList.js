import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    PlusCircleOutlined,
    DeleteOutlined,
    FolderOutlined,
    EditOutlined,
    FileExcelOutlined
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
                    modifiedDate: x.modifiedDate,
                    unitStock: x.unitStock
                }
            })
            setProducts(remap);
        })
    }, [])

    const handleDelete = (id) => {
        axios.post(`/api/product/delete/${id}`).then(response => {
            if (response.data) {
                setProducts(products.filter(x => x.key !== id));
                message.info('Xóa thành công!');
            } else {
                message.error('Xóa thất bại!');
            }
        })
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text, record) => <Link to={`/product-setting/${record.key}`}>{text}</Link>,
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate'
        },
        {
            title: 'Kho',
            dataIndex: 'unitStock'
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="small">
                    <Link to={`/product-center/${record.key}`}>
                        <Button icon={<FolderOutlined />}></Button>
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
    }

    const exportProduct = async () => {
        let response = await axios({
            url: '/api/product/export',
            method: 'POST',
            responseType: 'blob'
        })
        if (response.data) {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            var url = URL.createObjectURL(blob);
            window.open(url)
        } else {
            message.error(response.data.error);
        }
    }

    return (
        <div className="p-4">
            <div className="text-right mb-3">
                <Button icon={<FileExcelOutlined />} disabled className="mr-2" onClick={exportProduct}>Nhập Excel</Button>
                <Button icon={<FileExcelOutlined />} className="mr-2" onClick={exportProduct}>Xuất Excel</Button>
                <Link to="/product-setting">
                    <Button type="primary" icon={<PlusCircleOutlined />}>
                        Thêm sản phẩm
                    </Button>
                </Link>
            </div>
            <div className="bg-white p-4">
                <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} />
            </div>
        </div>
    )
}

export default ProductList