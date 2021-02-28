import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    InfoCircleOutlined
} from '@ant-design/icons';
import { OrderType } from '../models/OrderModel';
import { Analysis } from '../dashboards/Analysis';

const Dashboard = () => {

    const [totalProduct, setTotalProduct] = useState(0);
    const [totalEployee, setTotalEployee] = useState(0);
    const [totalOrderExport, setTotalOrderExport] = useState(0);
    const [totalOrderImport, setTotalOrderImport] = useState(0);

    useEffect(() => {
        axios.get('/api/dashboard/get-total-product').then(response => setTotalProduct(response.data));
        axios.get('/api/dashboard/get-total-employee').then(response => setTotalEployee(response.data));
        axios.get(`/api/dashboard/get-total-order?orderType=${OrderType.Export}`).then(response => setTotalOrderExport(response.data));
        axios.get(`/api/dashboard/get-total-order?orderType=${OrderType.Import}`).then(response => setTotalOrderImport(response.data));
    })

    return (
        <Content className="p-4">
            <Row gutter={16} className="mb-4">
                <Col span={6}>
                    <Card title="Nhân viên" bordered={false} extra={<Link to="/account-list"><InfoCircleOutlined /></Link>}>
                        {totalEployee}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Sản phẩm" bordered={false} extra={<Link to="/product-list"><InfoCircleOutlined /></Link>}>
                        {totalProduct}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Nhập" bordered={false}>
                        {totalOrderExport}
                </Card>
                </Col>
                <Col span={6}>
                    <Card title="Xuất" bordered={false}>
                        {totalOrderImport}
                    </Card>
                </Col>
            </Row>
            <div className="bg-white mb-4 p-4">
                <Analysis/>
            </div>
        </Content>
    )
}

export default Dashboard