import * as React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
    PlusOutlined,
    RollbackOutlined
} from '@ant-design/icons';

const AccountAdd = () => {

    const { role } = useParams<any>( );

    const onFinish = (values: any) => {
        if (!role) {
            message.error('Không tìm thấy vai trò người dùng!');
            return;
        }
        axios.post(`/api/account/add/${role}`, values).then(response => {
            if (response.data.succeeded) {
                message.success('Tạo tài khoản thành công!');
            } else {
                response.data.errors.forEach((value: any) => {
                    message.error(value.description)
                });
            }
        })
    };

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