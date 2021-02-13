import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    PlusCircleOutlined,
    DeleteOutlined,
    FolderOutlined,
    EditOutlined,
    FileExcelOutlined,
    SearchOutlined
} from '@ant-design/icons';

const ProductList = () => {

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        axios.get('/api/product/list-all').then(response => {
            setProducts(response.data);
        })
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder='Nhập từ khóa...'
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Tìm
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Hủy
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible && searchInput.current) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    const handleDelete = (id) => {
        axios.post(`/api/product/delete/${id}`).then(response => {
            if (response.data) {
                setProducts(products.filter(x => x.id !== id));
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
            render: (text, record) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            render: (text) => (
                <div>
                    <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)}</span>
                </div>
            )
        },
        {
            title: 'Kho',
            dataIndex: 'unitStock'
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'modifiedDate'
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="small">
                    <Link to={`/product-center/${record.id}`}>
                        <Button icon={<FolderOutlined />}></Button>
                    </Link>
                    <Link to={`/product-setting/${record.id}`}>
                        <Button type="primary" icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record.id)}
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
                <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} rowKey="id" />
            </div>
        </div>
    )
}

export default ProductList