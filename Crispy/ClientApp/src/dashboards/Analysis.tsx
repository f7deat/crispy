import * as React from 'react';
import { Tabs, Row, Col, List, Typography, Badge, Empty } from 'antd';
import { Column } from '@ant-design/charts';
import axios from 'axios';

const { TabPane } = Tabs;

export const Analysis = () => {
    var data = [
        {
            type: '家具家电',
            sales: 38,
        },
        {
            type: '粮油副食',
            sales: 52,
        },
        {
            type: '生鲜水果',
            sales: 61,
        },
        {
            type: '美容洗护',
            sales: 145,
        },
        {
            type: '母婴用品',
            sales: 48,
        },
        {
            type: '进口食品',
            sales: 38,
        },
        {
            type: '食品饮料',
            sales: 38,
        },
        {
            type: '家庭清洁',
            sales: 38,
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

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Xuất" key="1">
                <Row gutter={16} className="py-4">
                    <Col span={16}>
                        <Column {...config} height={ 300 } autoFit/>
                    </Col>
                    <Col span={8}>
                        <Typography.Title level={5}>Lợi nhuận</Typography.Title>
                        <List
                            dataSource={customers}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Badge color="#f50"/> {item.name}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </TabPane>
            <TabPane tab="Nhập" key="2">
                <Empty/>
            </TabPane>
        </Tabs>
    )
}