import * as React from 'react';
import { Tabs, Row, Col, List, Typography, Badge, Empty, DatePicker, Button, Space } from 'antd';
import { Column } from '@ant-design/charts';
import axios from 'axios';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

export const Analysis = () => {
    var data = [
        {
            type: 'T1',
            sales: 38,
        },
        {
            type: 'T2',
            sales: 52,
        },
        {
            type: 'T3',
            sales: 61,
        },
        {
            type: 'T4',
            sales: 145,
        },
        {
            type: 'T5',
            sales: 48,
        },
        {
            type: 'T6',
            sales: 38,
        },
        {
            type: 'T7',
            sales: 38,
        },
        {
            type: 'T8',
            sales: 67,
        },
        {
            type: 'T9',
            sales: 28,
        },
        {
            type: 'T10',
            sales: 156,
        },
        {
            type: 'T11',
            sales: 245,
        },
        {
            type: 'T12',
            sales: 145,
        },
    ];
    var config: any = {
        data: data,
        xField: 'type',
        yField: 'sales',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: { alias: '类别' },
            sales: { alias: '销售额' },
        },
    };

    const [customers, setCustomers] = React.useState();

    React.useEffect(() => {
        axios.get('/api/account/get-top-customers-spending').then((response) => {
            setCustomers(response.data)
        })
    }, [])

    const operations = (
        <Space>
            <Button type="text">Ngày</Button>
            <Button type="text">Tuần</Button>
            <Button type="text" danger>Tháng</Button>
            <Button type="text">Năm</Button>
            <RangePicker />
        </Space>
    )

    return (
        <Tabs defaultActiveKey="1" tabBarExtraContent={operations} className="p-4">
            <TabPane tab="Xuất" key="1">
                <Row gutter={16} className="py-4">
                    <Col span={16}>
                        <Column {...config} height={300} autoFit />
                    </Col>
                    <Col span={8}>
                        <Typography.Title level={5}>Lợi nhuận</Typography.Title>
                        <List
                            dataSource={customers}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Badge color="#f50" /> {item.name}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </TabPane>
            <TabPane tab="Nhập" key="2">
                <Empty />
            </TabPane>
        </Tabs>
    )
}