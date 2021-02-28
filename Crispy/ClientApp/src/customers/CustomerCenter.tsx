import { Avatar, Col, Row } from 'antd';
import * as React from 'react';
import {
    UserOutlined,
} from '@ant-design/icons';

export const CustomerCenter = () => {
    return (
        <Row>
            <Col span={6}>
                <Avatar size="large" icon={<UserOutlined />} />
            </Col>
            <Col span={18}>

            </Col>
        </Row>
    )
}