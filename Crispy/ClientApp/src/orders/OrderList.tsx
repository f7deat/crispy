import { Button } from 'antd';
import React from "react";
import { Link } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';

const OrderList = () => {
    return (
        <div className="p-4">
            <div className="text-right mb-3">
                <Link to="/order-setting/export" className="mr-2"><Button type="primary" icon={<PlusCircleOutlined />}>Xuất kho</Button></Link>
                <Link to="/order-setting/import"><Button type="primary" danger icon={<PlusCircleOutlined />}>Nhập kho</Button></Link>
            </div>
        </div>
    )
}

export default OrderList