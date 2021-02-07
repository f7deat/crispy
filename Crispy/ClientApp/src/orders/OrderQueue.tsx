import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IOrderProps } from "../models/props/IOrderProps"

const OrderQueue = (props: IOrderProps) => {
    const [products, setProducts] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(() => {
        axios.get(`/api/order/get-list-product?orderType=${props.orderType}`).then(response => {
            setProducts(response.data.map((x: any) => {
                return {
                    key: x.id,
                    name: x.name
                }
            }));
        });
    }, [])

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
        console.log(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: any) => <Link to={`/product-setting/${record.key}`}>{text}</Link>,
        },
        {
            title: 'Tác vụ',
            render: () => <Button type="primary">Thêm</Button>
        }
    ]
    return (
        <div>
            <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} />
        </div>
    )
}

export default OrderQueue