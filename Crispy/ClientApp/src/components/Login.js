import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';
import axios from 'axios';
import {
    UserOutlined,
    LockOutlined,
    CopyrightCircleOutlined,
    GithubOutlined,
    FacebookFilled,
    GoogleCircleFilled
} from '@ant-design/icons';
import { useHistory } from 'react-router';

const Login = ({ setAuthenticated }) => {

    const {history} = useHistory();

    const onFinish = (values) => {
        axios.post('/home/login', values).then(response => {
            if (response.data.succeeded) {
                setAuthenticated(true);
                history.push('')
            }
        })
    };

    const onFinishFailed = () => {
        message.error('Sai tên đăng nhập hoặc mật khẩu!');
    };

    return (
        <Layout className="h-full" style={{ backgroundImage: 'url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)' }}>
            <Content className="flex items-center justify-center h-full">
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
                        <Button type="primary" htmlType="submit" block size="large">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className="flex items-center">
                        <div className="mr-2">Đăng nhập với:</div>
                        <FacebookFilled className="mx-2 text-xl" />
                        <GoogleCircleFilled className="mx-2 text-xl" />
                    </div>
                </Form>
            </Content>
            <Footer className="text-center">
                <div className="mb-2">
                    <GithubOutlined />
                </div>
                <div className="flex items-center justify-center">
                    Copyright<CopyrightCircleOutlined className="mx-2" />2021 DefZone.Net
                </div>
            </Footer>
        </Layout>
    );
};

export default Login