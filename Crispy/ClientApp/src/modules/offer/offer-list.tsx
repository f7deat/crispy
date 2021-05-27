import { Button, Drawer } from "antd"
import React, { useState } from "react"
import {
    PlusOutlined
} from '@ant-design/icons';

const OfferList = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    return (
        <div>
            <div className="mb-3 flex justify-end">
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerVisible(true)}>Tạo offer</Button>
            </div>
            <Drawer
                title="Tạo Offer"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={700}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}

export default OfferList