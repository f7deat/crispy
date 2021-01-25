import { Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

const AccountCenter = () => {
    return (
        <Row>
            <Col span={7} className="p-4">
                <Content className="bg-white p-4">
                    <div className="flex justify-center mb-2">
                        <img alt="" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" width={104} height={104} />
                    </div>
                    <div style={{ fontWeight: 'bold' }} className="text-center text-lg">Serati Ma</div>
                </Content>
            </Col>
            <Col span={17} className="p-4">
                <Content className="bg-white"></Content>
            </Col>
        </Row>
    )
}
export default AccountCenter