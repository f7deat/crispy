import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    DashboardOutlined
} from '@ant-design/icons';

import './custom.css'
import Login from './components/Login';
import { Link, Route, Switch } from 'react-router-dom';
import AccountCenter from './accounts/AccountCenter';
import { Home } from './components/Home';

const { Header, Content, Sider } = Layout;

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isAuthenticated: false
        };
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    authenticated = () => {
        this.setState({
            isAuthenticated: true
        })
    }

    render() {
        return (
            <div className="h-full">
                {
                    this.state.isAuthenticated ? (
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
                                <Header className="site-layout-background" style={{ padding: 0 }}>
                                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: this.toggle,
                                    })}
                                </Header>
                                <Content
                                    className="site-layout-background"
                                    style={{
                                        margin: '24px 16px',
                                        padding: 24,
                                    }}
                                >
                                    <Switch>
                                        <Route path="/account-center">
                                            <AccountCenter />
                                        </Route>
                                        <Route path="/">
                                            <Home />
                                        </Route>
                                    </Switch>
                                </Content>
                            </Layout>
                        </Layout>
                    ) : (<Login authenticated={this.authenticated}/>)
                }
            </div>

        );
    }
}
