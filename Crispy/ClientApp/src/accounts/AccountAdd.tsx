import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Row, Col, Upload } from 'antd';
import { Link } from 'react-router-dom';
import {
    PlusOutlined,
    RollbackOutlined,
    LoadingOutlined
} from '@ant-design/icons';

const AccountAdd = () => {

    const [avatar, setAvatar] = useState('');
    const [loading, setLoading] = useState<boolean>(false)

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
        </div>
    );

    const onFinish = (values: any) => {
        axios.post('/api/account/add', values).then(response => {
            if (response.data.succeeded) {
                message.success('Tạo tài khoản thành công!');
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value.description)
                });
            }
        })
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    return (
        <div className="p-4">
            <div className="p-4 bg-white">
                <Form
                    name="basic"
                    initialValues={{
                        remember: true
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Tài khoản"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tài khoản!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phoneNumber">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item className="mr-4 inline-block">
                        <Link to="/account-list"><Button icon={<RollbackOutlined />}>Hủy</Button></Link>
                    </Form.Item>
                    <Form.Item className="inline-block">
                        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>Tạo tài khoản</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AccountAdd