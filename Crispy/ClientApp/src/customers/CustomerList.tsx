import axios from 'axios';
import * as React from 'react';

const CustomerList = () => {

    const [account, setAccount] = React.useState()

    React.useEffect(() => {
        axios.get('/api/account/get-list-customer').then(response => {
            setAccount(response.data);
            debugger
        })
    })
    return (
        <div></div>
    )
}
export default CustomerList