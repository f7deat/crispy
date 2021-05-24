import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountAdd from './accounts/AccountAdd';
import AccountCenter from './accounts/AccountCenter';
import AccountList from './accounts/AccountList';
import AccountSetting from './accounts/AccountSetting';
import CategoryList from './categories/CategoryList';
import Dashboard from './components/Dashboard';
import { CustomerCenter } from './customers/CustomerCenter';
import CustomerList from './customers/CustomerList';
import { OrderType } from './models/OrderModel';
import { Invoice } from './orders/Invoice';
import OrderList from './orders/OrderList';
import OrderSetting from './orders/OrderSetting';
import ProductList from './products/ProductList';
import ProductSetting from './products/ProductSetting';
import RoleList from './roles/RoleList';
import Logo from './settings/logo';

export const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/setting/logo">
                <Logo />
            </Route>
            <Route exact path="/category-list">
                <CategoryList />
            </Route>
            <Route exact path="/invoice/:id">
                <Invoice />
            </Route>
            <Route exact path="/customer-center/:id">
                <CustomerCenter />
            </Route>
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
            <Route exact path="/role-list">
                <RoleList />
            </Route>
            <Route exact path="/account-add/:role">
                <AccountAdd />
            </Route>
            <Route path="/account-setting/:id?">
                <AccountSetting />
            </Route>
            <Route exact path="/account-list">
                <AccountList />
            </Route>
            <Route exact path="/account-center/:id?">
                <AccountCenter />
            </Route>
            <Route exact path="/">
                <Dashboard />
            </Route>
        </Switch>
    )
}