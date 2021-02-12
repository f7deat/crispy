import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const AccountAdd = () => {

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
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Tạo tài khoản</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AccountAdd