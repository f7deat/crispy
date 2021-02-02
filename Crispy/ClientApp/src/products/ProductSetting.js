import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

const ProductSetting = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [fields, setFields] = useState({})

    useEffect(() => {
        axios.post(`/api/product/find/${id}`).then(response => {
            setProduct(response.data);
            setFields([
                {
                    name: ['name'],
                    value: response.data.name
                },
                {
                    name: ['description'],
                    value: response.data.description
                }
            ])
        })
    }, [])

    const handleFinish = (values) => {
        if (id) {
            
        } else {
            axios.post('/api/product/add', values).then(response => {
                if (response.data) {
                    message.info('Tạo sản phẩm thành công!');
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
                    <Form.Item label="Tên sản phẩm" name="name" >
                        <Input placeholder="Tên sản phẩm" required />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description" >
                        <TextArea placeholder="Mô tả" rows={3} />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content" >
                        <TextArea placeholder="Nội dung" rows={5} />
                    </Form.Item>
                    <Form.Item label="Đơn giá" name="unitPrice" >
                        <Input placeholder="Đơn giá" required />
                    </Form.Item>
                    <Form.Item label="Giá khuyến mại" name="salePrice" >
                        <Input placeholder="Giá khuyến mại" required />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Cập nhật thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ProductSetting