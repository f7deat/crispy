import React, { Component, useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AccountCenter from '../accounts/AccountCenter';
import AccountList from '../accounts/AccountList';
import AccountAdd from '../accounts/AccountAdd';
import Dashboard from './Dashboard';
import { Layout, Menu, Dropdown, Button, Avatar } from 'antd';
import AccountSetting from '../accounts/AccountSetting';
import ProductList from '../products/ProductList';
import ProductSetting from '../products/ProductSetting';
import OrderList from '../orders/OrderList';
import OrderSetting from '../orders/OrderSetting';
import CustomerList from '../customers/CustomerList';
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
    SettingOutlined
} from '@ant-design/icons';
import { OrderType } from '../models/OrderModel';

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

const Home = () => {

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
            <Menu.Item danger onClick={() => this.props.authenticated(false)}>
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
                    <Menu.Item key="3" icon={<InboxOutlined />}><Link to="/order-list" />Xuất / Nhập</Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Nhân viên">
                        <Menu.Item key="4">
                            <Link to="/account-list">Danh sách</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5" icon={<UserOutlined />}><Link to="/customer-list" />Khách hàng</Menu.Item>
                    <Menu.Item key="6" icon={<SettingOutlined />}><Link to="/setting" />Cài đặt</Menu.Item>
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
                    </div>
                </Header>
                <Switch>
                    <Route exact path="/customer-list">
                        <CustomerList />
                    </Route>
                    <Route exact path="/order-setting/export">
                        <OrderSetting orderType={OrderType.Export} />
                    </Route>
                    <Route exact path="/order-setting/import">
                        <OrderSetting orderType={OrderType.Import} />
                    </Route>
                    <Route exact path="/order-list">
                        <OrderList />
                    </Route>
                    <Route exact path="/product-setting/:id?">
                        <ProductSetting />
                    </Route>
                    <Route exact path="/product-list">
                        <ProductList />
                    </Route>
                    <Route exact path="/account-add">
                        <AccountAdd />
                    </Route>
                    <Route path="/account-setting/:id?">
                        <AccountSetting />
                    </Route>
                    <Route exact path="/account-list">
                        <AccountList />
                    </Route>
                    <Route exact path="/account-center">
                        <AccountCenter />
                    </Route>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </Layout>
        </Layout>
    )
}

export default Home