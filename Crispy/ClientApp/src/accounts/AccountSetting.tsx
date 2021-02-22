import { Alert, Button, Checkbox, DatePicker, Divider, Empty, Form, Input, message, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { SaveOutlined } from '@ant-design/icons';
import { TanError } from '../models/interfaces/tanResponse';
import * as moment from 'moment';

const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;
const dateFormat = 'YYYY-MM-DD';

const AccountSetting = () => {
    const { id } = useParams<any>();

    const plainOptions = ['admin', 'employee'];
    const defaultCheckedList = ['employee'];

    const [account, setAccount] = useState<any>({});
    const [fields, setFields] = useState<any>({});
    const [activeTab, setActiveTab] = useState<string>('1');
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);

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

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
    };

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

    const addToRoles = () => {
        axios.post('/api/account/add-to-roles', {
            id: id,
            roles: checkedList
        }).then(response => {
            if (response.data.succeeded) {
                message.info('Lưu thành công!');
            } else {
                response.data.errors.forEach((value: TanError) => {
                    message.error(value.description);
                })
            }
        })
    }

    function handleChangeDate(dateString, type) {
        switch (type) {
            case 1:
                account.dateOfBirth = dateString
                break;
            case 2:
                account.hireDate = dateString
                break;
            default:
        }
    }

    return (
        <div className="p-4">
            <Tabs tabPosition="left" className="bg-white p-4" onChange={handleChangeTab}>
                <TabPane tab="Cài đặt chung" key="1">
                    <Title level={3}>Cài đặt chung</Title>
                    <Divider />
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
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                        <Form.Item label="Ngày sinh">
                            {account.dateOfBirth && (<DatePicker defaultValue={moment(account.dateOfBirth, dateFormat)} format={dateFormat} onChange={(date, dateString) => handleChangeDate(dateString, 1)} />)}
                        </Form.Item>
                        <Form.Item label="Ngày tuyển dụng">
                            {account.hireDate && (<DatePicker defaultValue={moment(account.hireDate, dateFormat)} format={dateFormat} onChange={(date, dateString) => handleChangeDate(dateString, 2)} />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Cập nhật thông tin</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Cài đặt nâng cao" key="2">
                    <Title level={3}>Cài đặt nâng cao</Title>
                    <Divider />
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
                    <Divider />
                    <Alert message="Comming soon!" type="info" showIcon />
                </TabPane>
                <TabPane tab="Quyền" key="4">
                    <Title level={3}>Quyền</Title>
                    <Divider />
                    <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                    <div className="mt-3">
                        <Button type="primary" onClick={addToRoles} icon={<SaveOutlined />}> Cập nhật</Button>
                    </div>
                </TabPane>
                <TabPane tab="Khác" key="5">
                    <Title level={3}>Cài đặt khác</Title>
                    <Divider />
                    <Empty />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountSetting