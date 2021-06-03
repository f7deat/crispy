import { Button, Drawer, Input, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  FolderOutlined
} from '@ant-design/icons';

export default function BrandList() {
    const [brands, setBrands] = useState<any>([])
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const [brand, setBrand] = useState<any>({})
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        axios.get(`/api/brand/get-list`).then(response => {
            setBrands(response.data)
        })
    }
    const columns = [
        {
            title: '#',
            render: (text: any, record: any, index: number) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: 'Tên',
            render: (record: any) => (
                <div>{record.name}</div>
            )
        },
        {
            title: 'Giới thiệu',
            render: (record: any) => (
                <div>{record.description}</div>
            )
        },
        {
            title: 'Tác vụ',
            render: (record: any) => (
                <Space>
                    <Button type="primary" icon={<FolderOutlined/>}></Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>}></Button>
                </Space>
            )
        }
    ]
    function save() {
        if (brand.id) {
            
        } else {
            axios.post(`/api/brand/add`, brand).then(response => {
                if (response.data.succeeded) {
                    fetchData()
                    setDrawerVisible(false)
                }
            })
        }
    }
    return (
        <div>
            <div className="mb-4">
                <Button type="primary" onClick={() => setDrawerVisible(true)} icon={<PlusOutlined/>}>Tạo mới</Button>
            </div>
            <Table dataSource={brands} columns={columns} />

            <Drawer
                title="Tạo thương hiệu"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={700}
            >
                <div>Tên</div>
                <Input onChange={(e: any) => setBrand({ ...brand, name: e.target.value })} className="mb-2" />
                <div>Mô tả</div>
                <Input.TextArea onChange={(e: any) => setBrand({ ...brand, description: e.target.value })} value={brand?.description} className="mb-2"/>
                <div>Logo</div>
                <Input onChange={(e: any) => setBrand({ ...brand, logo: e.target.value })} value={brand?.logo} className="mb-2"/>
                <Space>
                    <Button type="primary" onClick={() => save()}>Lưu lại</Button>
                    <Button onClick={() => setDrawerVisible(false)}>Đóng</Button>
                </Space>
            </Drawer>
        </div>
    )
}