import React from 'react';
import { Row, Col, Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';

const Dashboard = () => {
    return (
        <Content className="p-4">
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="Card title" bordered={false}>
                            Card content
        </Card>
                    </Col>
                </Row>
        </Content>
    )
}

export default Dashboard