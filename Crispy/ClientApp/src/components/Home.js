import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AccountCenter from '../accounts/AccountCenter';
import Dashboard from './Dashboard';
import { Layout, Menu, Dropdown } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DashboardOutlined,
    DownOutlined
} from '@ant-design/icons';

const { Sider, Header } = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
      </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
      </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
);

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
        return (
            <Layout className="h-screen">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}><Link to="/" />Dashboard</Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />}>nav 1</Menu.Item>
                        <Menu.Item key="3" icon={<VideoCameraOutlined />}>nav 2</Menu.Item>
                        <Menu.Item key="4" icon={<UploadOutlined />}>nav 3</Menu.Item>
                        <Menu.Item key="5" icon={<UserOutlined />}><Link to="account-center" />Account</Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="bg-white flex justify-between" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <Dropdown overlay={menu} className="px-4">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                Hover me <DownOutlined />
                            </a>
                        </Dropdown>
                    </Header>
                    <Switch>
                        <Route path="/account-center">
                            <AccountCenter />
                        </Route>
                        <Route path="/">
                            <Dashboard />
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        );
    }
}
