import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from 'antd';
import {
    UserOutlined,
    LockOutlined,
    FacebookFilled,
    GoogleCircleFilled
} from '@ant-design/icons';

const AccountRegister = (props) => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        axios.post('/home/login').then(response => {
            if (response.data) {
                props.authenticated();
            }
        })
    };

    return (
        <Form
            name="basic"
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="w-96"
        >
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
                <Input size="large" prefix={<UserOutlined style={{ color: '#1890ff' }} />} placeholder="Tài khoản" />
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
                <Input.Password size="large" prefix={<LockOutlined style={{ color: '#1890ff' }} />} placeholder="Mật khẩu" />
            </Form.Item>

            <div className="flex justify-between items-center">
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                </Form.Item>
                <a href="/forgot-password" style={{ marginBottom: '24px' }}>Quên mật khẩu?</a>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">Đăng ký</Button>
            </Form.Item>
            <div className="flex items-center">
                <div className="mr-2">Đăng ký với:</div>
                <FacebookFilled className="mx-2 text-xl" />
                <GoogleCircleFilled className="mx-2 text-xl" />
            </div>
        </Form>
    )
}

export default AccountRegister