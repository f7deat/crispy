import { Alert, Button, Form, Input, message, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const { TabPane } = Tabs;

const AccountSetting = () => {
    const { id } = useParams();

    const [account, setAccount] = useState({})
    const [fields, setFields] = useState({})

    useEffect(() => {
        axios.get(`/api/account/get/${id}`).then(response => {
            setAccount(response.data);
            setFields([
                {
                    name: ['name'],
                    value: response.data.name
                },
                {
                    name: ['phoneNumber'],
                    value: response.data.phoneNumber
                }
            ])
        })
    }, [])

    const handleUpdate = (values) => {
        let item = account;
        item.name = values.name;
        item.phoneNumber = values.phoneNumber;
        axios.post(`/api/account/update`, item).then(response => {
            if (response.data.succeeded) {
                setAccount(item);
                message.info('Cập nhật thông tin thành công!');
            } else {
                response.data.errors.forEach(value => {
                    message.warning(value);
                })
            }
        })
    }

    return (
        <div className="p-4">
            <Tabs tabPosition="left" className="bg-white p-4">
                <TabPane tab="Cài đặt chung" key="1">
                    <Title level={3}>Cài đặt chung</Title>
                    <Form layout="vertical" onFinish={handleUpdate} fields={fields}>
                        <Form.Item label="Họ và tên" name="name" >
                            <Input placeholder="Họ và tên" required />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phoneNumber">
                            <Input placeholder="Số điện thoại" required/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Cập nhật thông tin</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Thông báo" key="2">
                    <Title level={3}>Thông báo</Title>
                    <Alert message="Comming soon!" type="info" showIcon />
                </TabPane>
                <TabPane tab="Khác" key="3">
                    <Title level={3}>Cài đặt khác</Title>
                    <Alert message="Comming soon!" type="info" showIcon />
          </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountSetting