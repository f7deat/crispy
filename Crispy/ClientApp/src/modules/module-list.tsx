import { Row, Col, Card } from "antd"
import React from "react"
import { Link } from "react-router-dom"

const ModuleList = () => {
    return (
        <Row gutter={16}>
            <Col span={8}>
                <Link to="/modules/offer/list">
                    <Card title="Chào giá" bordered={false}>
                        <div>Tạo và gửi offer tới khách hàng</div>
                    </Card>
                </Link>
            </Col>
            <Col span={8}>
                <Card title="Comming soon" bordered={false}>
                    Comming soon...
        </Card>
            </Col>
            <Col span={8}>
                <Card title="Comming soon" bordered={false}>
                    Comming soon...
        </Card>
            </Col>
        </Row>
    )
}

export default ModuleList