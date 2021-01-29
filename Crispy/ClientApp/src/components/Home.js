﻿import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AccountCenter from '../accounts/AccountCenter';
import AccountList from '../accounts/AccountList';
import Dashboard from './Dashboard';
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DashboardOutlined,
    TranslationOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import AccountSetting from '../accounts/AccountSetting';

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const lang = (
    <Menu>
        <Menu.Item>
            Tiếng Việt
        </Menu.Item>
        <Menu.Item>
            Tiếng Anh
        </Menu.Item>
    </Menu>
)

export default class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {


        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="account-center"><UserOutlined /> Hồ sơ</Link>
                </Menu.Item>
                <Menu.Item danger onClick={this.props.authenticated}>
                    <LogoutOutlined /> Đăng xuất
                </Menu.Item>
            </Menu>
        )
        return (
            <Layout className="h-screen">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/" />Dashboard</Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>nav 1</Menu.Item>
                        <Menu.Item key="3" icon={<VideoCameraOutlined />}>nav 2</Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined />}>nav 3</Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Nhân viên">
                            <Menu.Item key="5">
                                <Link to="account-center">Account</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="account-list">Danh sách</Link>
                            </Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="bg-white flex justify-between items-center p-0">
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <div className="flex px-3 items-center">
                            <Dropdown overlay={menu}>
                                <Button type="text" size="large" className="flex items-center">
                                    <img alt="avatar" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" width={24} height={24} />
                                    <span className="ml-2">Đinh Công Tân</span>
                                </Button>
                            </Dropdown>
                            <Dropdown overlay={lang}>
                                <Button type="text" size="large">
                                    <TranslationOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                    </Header>
                    <Switch>
                        <Route path="/account-setting">
                            <AccountSetting />
                        </Route>
                        <Route path="/account-list">
                            <AccountList />
                        </Route>
                        <Route path="/account-center">
                            <AccountCenter />
                        </Route>
                        <Route exact path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        );
    }
}
