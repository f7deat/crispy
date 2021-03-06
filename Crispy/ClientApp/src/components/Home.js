﻿import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import axios from 'axios';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DashboardOutlined,
    TranslationOutlined,
    LogoutOutlined,
    AppstoreAddOutlined,
    InboxOutlined,
    ToolOutlined,
    FileImageOutlined,
    SettingOutlined,
    QuestionCircleOutlined,
    FolderAddOutlined,
    ClusterOutlined
} from '@ant-design/icons';
import { AppRouter } from '../app-router';
import { Content } from 'antd/lib/layout/layout';

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const lang = (
    <Menu>
        <Menu.Item>
            Tiếng Việt
        </Menu.Item>
        <Menu.Item disabled>
            Tiếng Anh
        </Menu.Item>
    </Menu>
)

const Home = ({ setAuthenticated }) => {

    const [collapsed, setCollapsed] = useState(false)
    const [account, setAccount] = useState({})

    useEffect(() => {
        axios.get('/api/account/get/0').then(response => {
            setAccount(response.data);
        })
    }, [])

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/account-center"><UserOutlined /> Hồ sơ</Link>
            </Menu.Item>
            <Menu.Item danger onClick={() => setAuthenticated(false)}>
                <LogoutOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    )

    const toos = (
        <Menu>
            <Menu.Item>
                <a href="https://f7deat.github.io/jubilant-enigma/" target="_blank" rel="noopener noreferrer"><FileImageOutlined /> Chỉnh sửa ảnh</a>
            </Menu.Item>
        </Menu>
    )

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/" />Dashboard</Menu.Item>
                    <Menu.Item key="2" icon={<AppstoreAddOutlined />}><Link to="/product-list" />Sản phẩm</Menu.Item>
                    <Menu.Item key="3" icon={<FolderAddOutlined />}><Link to="/category-list" />Danh mục</Menu.Item>
                    <Menu.Item key="4" icon={<InboxOutlined />}><Link to="/order-list" />Xuất / Nhập</Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Nhân viên">
                        <Menu.Item key="5">
                            <Link to="/account-list">Danh sách</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="6" icon={<UserOutlined />}><Link to="/customer-list" />Khách hàng</Menu.Item>
                    <SubMenu key="sub2" icon={<SettingOutlined />} title="Cài đặt">
                        <Menu.Item key="7">
                            <Link to="/role-list">Quyền</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/setting/logo">Logo</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<ClusterOutlined />}><Link to="/modules" />Modules</Menu.Item>
                    <Menu.Item key="10" icon={<ClusterOutlined />}><Link to="/brands" />Thương hiệu</Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="bg-white flex items-center p-0">
                    <div className="flex-grow">
                        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggle} className="ml-4"></Button>
                        <Dropdown overlay={toos}>
                            <Button type="text" icon={<ToolOutlined />}>
                                Công cụ
                            </Button>
                        </Dropdown>
                    </div>
                    <div className="flex px-3 items-center">
                        <Dropdown overlay={menu}>
                            <Button type="text" className="flex items-center">
                                <Avatar icon={account?.name?.charAt(0)} />
                                <span className="ml-2">{account?.name}</span>
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={lang}>
                            <Button type="text" icon={<TranslationOutlined />}></Button>
                        </Dropdown>
                        <Button type="text"><a href="https://def-zone.github.io/sturdy-carnival/#/" target="_blank" rel="noopener noreferrer"><QuestionCircleOutlined /></a></Button>
                    </div>
                </Header>
                <Content className="p-4">
                    <AppRouter />
                </Content>
            </Layout>
        </Layout>
    )
}

export default Home