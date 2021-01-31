import { Button, Form, Input, message } from 'antd';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;

const ProductSetting = () => {

    const { id } = useParams();

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
                <Form layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Tên sản phẩm" name="name" >
                        <Input placeholder="Tên sản phẩm" required />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description" >
                        <TextArea placeholder="Mô tả" rows={3} />
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