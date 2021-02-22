import { Button } from 'antd';
import axios from 'axios';
import * as React from 'react';
import { AccountTable } from '../components/AccountTable';
import {
    PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CustomerList = () => {

    const [accounts, setAccounts] = React.useState()

    React.useEffect(() => {
        axios.get('/api/account/get-list-customer').then(response => {
            setAccounts(response.data);
        })
    }, [])

    return (
        <div className="p-4">
            <div className="bg-white p-4 rounded">
                <div className="mb-2">
                    <Link to="/account-add/customer">
                        <Button type="primary" icon={<PlusOutlined />}>Tạo khách hàng</Button>
                    </Link>
                </div>
                <AccountTable accounts={accounts} setAccounts={setAccounts} />
            </div>
        </div>
    )
}
export default CustomerList