import * as React from 'react';
import { Button, Input, Modal, Space, Table } from 'antd';
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
        axios.get(`/api/category/get-list`).then(response => {
            setListCategory(response.data);
        })
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        axios.post('/category/add').then(response => {
            if (response.data.id > 0) {
                setIsModalVisible(false);
            }
        })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'name',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            render: (record: any) => (
                <Space>
                    <Button icon={<DeleteOutlined/>} danger></Button>
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
                <Input onChange={(e: any) => {
                    category.name = e.target.value;
                    setCategory(category)
                }} className="mb-2" />
                <div>Mô tả</div>
                <Input.TextArea onChange={(e: any) => {
                    category.description = e.target.value;
                    setCategory(category)
                }} className="mb-2" />
                <div>Mô tả</div>
                <Input onChange={(e: any) => {
                    category.description = e.target.value;
                    setCategory(category)
                }} className="mb-2" />
            </Modal>
        </div>
    )
}

export default CategoryList