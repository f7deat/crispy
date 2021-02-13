import { Alert, Button, Form, Input, message, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const AccountSetting = () => {
    const { id } = useParams<any>();

    const [account, setAccount] = useState<any>({});
    const [fields, setFields] = useState<any>({});
    const [activeTab, setActiveTab] = useState<string>('1');

    useEffect(() => {
        axios.get(`/api/account/get/${id || '0'}`).then(response => {
            setAccount(response.data);
            setFields([
                {
                    name: ['name'],
                    value: response.data.name
                },
                {
                    name: ['phoneNumber'],
                    value: response.data.phoneNumber
                },
                {
                    name: ['salary'],
                    value: response.data.salary
                }
            ])
        })
    }, [id])

    const handleUpdate = (values: any) => {
        let url = '/api/account/update';
        switch (activeTab) {
            case '2': url = '/api/account/update-advance'; break;
            default:
        }
        let item = account;
        item.name = values.name;
        item.phoneNumber = values.phoneNumber;
        item.salary = values.salary;
        axios.post(url, item).then(response => {
            if (response.data.succeeded) {
                setAccount(item);
                message.info('Cập nhật thông tin thành công!');
            } else {
                response.data.errors.forEach((value: any) => {
                    message.warning(value);
                })
            }
        })
    }

    const handleChangeTab = (tabIndex: string) => {
        setActiveTab(tabIndex);
    }

    return (
        <div className="p-4">
            <Tabs tabPosition="left" className="bg-white p-4" onChange={handleChangeTab}>
                <TabPane tab="Cài đặt chung" key="1">
                    <Title level={3}>Cài đặt chung</Title>
                    <Form layout="vertical" onFinish={handleUpdate} fields={fields}>
                        <Form.Item label="Họ và tên" name="name" rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            }
                        ]}>
                            <Input placeholder="Họ và tên" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phoneNumber">
                            <Input placeholder="Số điện thoại"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Cập nhật thông tin</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Cài đặt nâng cao" key="2">
                    <Title level={3}>Cài đặt nâng cao</Title>
                    <Form layout="vertical" onFinish={handleUpdate} fields={fields}>
                        <Form.Item label="Lương" name="salary" >
                            <Input placeholder="Lương" required />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Cập nhật thông tin</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Thông báo" key="3">
                    <Title level={3}>Thông báo</Title>
                    <Alert message="Comming soon!" type="info" showIcon />
                </TabPane>
                <TabPane tab="Khác" key="4">
                    <Title level={3}>Cài đặt khác</Title>
                    <Alert message="Comming soon!" type="info" showIcon />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountSetting