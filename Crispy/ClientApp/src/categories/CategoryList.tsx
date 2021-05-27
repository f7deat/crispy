import * as React from 'react';
import { Button, Input, Modal, Popconfirm, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    DeleteOutlined,
} from '@ant-design/icons';

const CategoryList = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [category, setCategory] = useState<any>({})
    const [listCategory, setListCategory] = useState()

    useEffect(() => {
        getList()
    }, [])

    function getList() {
        axios.get(`/api/category/get-list`).then(response => {
            setListCategory(response.data);
        })
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        axios.post('/api/category/add', category).then(response => {
            if (response.data.id > 0) {
                setIsModalVisible(false);
                getList();
            }
        })
    };

    function handleDelete(id: number) {
        axios.post(`/api/category/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                getList()
            }
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: '#',
            render: (value: any, item: any, index: number) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            render: (record: any) => (
                <Space>
                    <Popconfirm
                        title="Xóa bản ghi?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div className="mb-4">
                <Button type="primary" onClick={showModal}>Tạo danh mục</Button>
            </div>
            <div className="p-4 bg-white rounded">
                <Table columns={columns} dataSource={listCategory} />
            </div>
            <Modal title="Danh múc" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>Tên danh mục</div>
                <Input onChange={(e: any) => setCategory({ ...category, name: e.target.value })} className="mb-2" />
                <div>Mô tả</div>
                <Input.TextArea onChange={(e: any) => setCategory({ ...category, description: e.target.value })} className="mb-2" />
            </Modal>
        </div>
    )
}

export default CategoryList