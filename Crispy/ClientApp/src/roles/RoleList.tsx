import { Button, Drawer, Input, message, Modal, Space, Table } from "antd";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { TanError } from "../models/interfaces/tanResponse";
import {
    PlusCircleOutlined,
    FolderOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Role } from "../models/entities/role";

const RoleList = () => {

    const [roles, setRoles] = useState<Role[]>()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [visible, setVisible] = useState(false);

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

    const handleDelete = (id: string) => {
        axios.post(`/api/role/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                setRoles(roles?.filter(x => x.id !== id));
                message.info('Xóa thành công!');
            } else {
                response.data.errors.forEach((value: TanError) => {
                    message.error(value.description);
                });
            }
        })
    }

    const columns = [
        {
            title: 'Quyền',
            dataIndex: 'name',
            render: (text: string, record: Role) => <Link to={`/role-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Normalized Name',
            dataIndex: 'normalizedName'
        },
        {
            title: 'Tác vụ',
            render: (text: string, record: Role) => (
                <Space size="small">
                    <Button type="primary" icon={<FolderOutlined />} onClick={() => setVisible(!visible)}></Button>
                    <Button type="primary" danger disabled icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}></Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
            <div className="flex justify-end mb-4">
                <Button type="primary" icon={<PlusCircleOutlined />} onClick={showModal} disabled>Tạo quyền</Button>
            </div>
            <Modal title="Tạo quyền" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>Nhập tên quyền:</div>
                <Input onChange={(e) => setRoleName(e.target.value)} />
            </Modal>
            <div className="p-4 bg-white">
                <Table columns={columns} dataSource={roles} pagination={{ pageSize: 5 }} rowKey="id" />
            </div>

            <Drawer
                title="Danh sách tài khoản"
                placement="right"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                width={720}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}

export default RoleList