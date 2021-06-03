import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { SaveOutlined } from '@ant-design/icons';

const { Option } = Select

const ProductSetting = () => {

    const { id } = useParams();
    const [fields, setFields] = useState(null)
    const history = useHistory();
    const [brands, setBrands] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                let response = await axios.get(`/api/product/find/${id}`);
                setFields([
                    {
                        name: 'id',
                        value: response.data.id
                    },
                    {
                        name: 'name',
                        value: response.data.name
                    },
                    {
                        name: 'description',
                        value: response.data.description
                    },
                    {
                        name: 'content',
                        value: response.data.content
                    },
                    {
                        name: 'unitPrice',
                        value: response.data.unitPrice
                    },
                    {
                        name: 'unitStock',
                        value: response.data.unitStock
                    },
                    {
                        name: 'createdDate',
                        value: response.data.createdDate
                    },
                    {
                        name: 'createdBy',
                        value: response.data.createdBy
                    },
                    {
                        name: 'brandId',
                        value: response.data.brandId
                    },
                    {
                        name: 'categoryId',
                        value: response.data.categoryId
                    }
                ])
            }
            fetchData();
        }
        axios.get(`/api/brand/get-list`).then(response => {
            setBrands(response.data)
        })
        axios.get(`/api/category/get-list`).then(response => {
            setCategories(response.data)
        })
    }, [id])

    const handleFinish = (values) => {
        if (id) {
            axios.post('/api/product/update', values).then(response => {
                if (response.data.succeeded) {
                    message.info('Cập nhật sản phẩm thành công!');
                    history.push('/product-list');
                } else {
                    message.error(response.data.error);
                }
            })
        } else {
            axios.post('/api/product/add', values).then(response => {
                if (response.data) {
                    message.info('Tạo sản phẩm thành công!');
                    history.push('/product-list')
                } else {
                    message.error('Tạo sản phẩm thất bại!');
                }
            })
        }
    }

    return (
        <div className="p-4">
            <div className="p-4 bg-white">
                <Title level={3}>Sản phẩm</Title>
                <Form layout="vertical" onFinish={handleFinish} fields={fields}>
                    <Form.Item name="id" hidden />
                    <Form.Item name="createdDate" hidden />
                    <Form.Item name="createdBy" hidden />
                    <Form.Item label="Tên sản phẩm" name="name" >
                        <Input placeholder="Tên sản phẩm" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description" >
                        <Input.TextArea placeholder="Mô tả" rows={3} />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <Input.TextArea placeholder="Nội dung" rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item label="Đơn giá" name="unitPrice" className="mr-4 inline-block">
                            <InputNumber placeholder="Đơn giá" />
                        </Form.Item>
                        <Form.Item label="Kho" name="unitStock" className="inline-block mr-4">
                            <InputNumber placeholder="Kho" />
                        </Form.Item>
                        <Form.Item className="inline-block mr-4" label="Thương hiệu" style={{width: 200}} name="brandId">
                            <Select>
                                {
                                    brands.map((value) => (
                                        <Option value={value.id} key={value.id}>{value.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item className="inline-block" label="Danh mục" style={{width: 200}} name="categoryId">
                            <Select>
                                {
                                    categories.map((value) => (
                                        <Option value={value.id} key={value.id}>{value.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button type="default" htmlType="button" className="mr-2"><Link to="/product-list">Quay lại</Link></Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Cập nhật thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ProductSetting