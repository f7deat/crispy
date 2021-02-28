import { Button, Divider, Space, Typography } from 'antd';
import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
    DownloadOutlined,
    PrinterOutlined
} from '@ant-design/icons';

export const Invoice = () => {

    const { id } = useParams<any>();

    const [order, setOrder] = React.useState<any>();

    React.useEffect(() => {
        axios.get(`/api/order/get/${id}`).then(response => {
            setOrder(response.data);
        })
    }, [id])

    return (
        <div className="p-4">
            <Typography.Title level={3}>Hoá đơn</Typography.Title>
            <div className="bg-white mb-4" style={{ padding: '2rem 5rem' }}>
                <div className="flex justify-between">
                    <div>
                        <div className="font-bold">Mã hóa đơn</div>
                        <div>#{order?.id}</div>
                    </div>
                    <div>
                        <div className="text-center">
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" height={32} className="mr-2" />
                            <Typography.Title level={4}>DefZone.Net</Typography.Title>
                        </div>
                        <div className="text-right">Thiên Hương, Thủy Nguyên, Hải Phòng</div>
                        <div className="text-right">Hotline: 076.255.9696</div>
                    </div>
                </div>
                <Divider />
                <div className="font-bold">Ngày lập</div>
                <div>{order?.createdDate}</div>
            </div>
            <div className="text-right">
                <Space>
                    <Button type="primary" icon={<DownloadOutlined />}>Tải xuống</Button>
                    <Button icon={<PrinterOutlined />}>In hóa đơn</Button>
                </Space>
            </div>
        </div>
    )
}