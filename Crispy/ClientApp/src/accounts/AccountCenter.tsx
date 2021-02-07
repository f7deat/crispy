import { Button, Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AccountModel } from '../models/AccountModel';

const AccountCenter = () => {

    const [account, setAccount] = useState<AccountModel>();

    const { id } = useParams<any>();

    useEffect(() => {
        if (id) {
            axios.get(`/api/account/get/${id}`).then((response) => {
                setAccount(response.data);
            })
        } else {
            axios.get('/api/account/get/0').then((response) => {
                setAccount(response.data);
            })
        }
    }, [id])

    return (
        <Row>
            <Col span={7} className="p-4">
                <Content className="bg-white p-4">
                    <div className="flex justify-center mb-2">
                        <img alt="" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" width={104} height={104} />
                    </div>
                    <div className="text-center text-lg font-bold">{account?.name}</div>
                    <Button type="primary"><Link to={`/account-setting/${account?.id}`}>Chỉnh sửa</Link></Button>
                </Content>
            </Col>
            <Col span={17} className="p-4">
                <Content className="bg-white"></Content>
            </Col>
        </Row>
    )
}
export default AccountCenter