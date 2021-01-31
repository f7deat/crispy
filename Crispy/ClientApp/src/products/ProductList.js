import React from 'react';

import { PlusCircleOutlined, DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <div className="p-4">
            <div className="text-right mb-3">
                <Link to="/product-setting"><Button type="primary" icon={<PlusCircleOutlined />}>Thêm sản phẩm</Button></Link>
            </div>
            <div className="bg-white p-4">
                zxc
            </div>
        </div>
    )
}

export default ProductList