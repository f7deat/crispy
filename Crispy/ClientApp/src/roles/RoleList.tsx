import { Button, Input, message, Modal } from "antd";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { TanError } from "../models/interfaces/tanResponse";
import {
    PlusCircleOutlined
} from '@ant-design/icons';

const RoleList = () => {

    const [roles, setRoles] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [roleName, setRoleName] = useState('');

    useEffect(() => {
        axios.get('/api/role/get-list').then(response => {
            setRoles(response.data);
        });
    }, [])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        axios.post(`/api/role/add/${roleName}`).then(response => {
            if (response.data.succeeded) {
                message.info('Tạo quyền thành công!');
                setIsModalVisible(false);
            } else {
                response.data.errors.forEach((value: TanError) => {
                    message.error(value.description);
                })
            }
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal}>Tạo quyền</Button>
            </div>
            <Modal title="Tạo quyền" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>Nhập tên quyền:</div>
                <Input onChange={(e) => setRoleName(e.target.value)} />
            </Modal>
            <div className="p-4 bg-white">

            </div>
        </div>
    )
}

export default RoleList