import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AccountCenter from '../accounts/AccountCenter';
import AccountList from '../accounts/AccountList';
import AccountAdd from '../accounts/AccountAdd';
import Dashboard from './Dashboard';
import { Layout, Menu, Dropdown, Button } from 'antd';
import AccountSetting from '../accounts/AccountSetting';
import ProductList from '../products/ProductList';
import ProductSetting from '../products/ProductSetting';
import OrderList from '../orders/OrderList';
import OrderSetting from '../orders/OrderSetting';
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
    FileImageOutlined
} from '@ant-design/icons';
import { OrderType } from '../models/OrderModel';

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
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
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
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="bg-white flex items-center p-0">
                        <div className="flex-grow">
                            <Button type="text" icon={this.state.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={this.toggle} className="ml-4"></Button>
                            <Dropdown overlay={toos}>
                                <Button type="text" icon={<ToolOutlined />}>
                                    Công cụ
                            </Button>
                            </Dropdown>
                        </div>
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
