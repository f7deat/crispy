import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../models/entities/Product";
import { IOrderQueueProps } from "../models/props/IOrderProps"

const OrderQueue = (props: IOrderQueueProps) => {
    const [products, setProducts] = useState<Product[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(() => {
        axios.get(`/api/order/get-list-product?orderType=${props.orderType}`).then(response => {
            setProducts(response.data);
        });
    }, [props.orderType])

    const onSelectChange = (e: any) => {
        setSelectedRowKeys(e)
        console.log(e)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const addProduct = (product: Product) => {
        props.setProducts((current: Product[]) => [...current, product])
        setProducts(products.filter(x => x.id !== product.id))
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: Product) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Tác vụ',
            render: (text: any, record: Product) => <Button type="primary" onClick={() => addProduct(record)}>Thêm</Button>
        }
    ]
    return (
        <div>
            <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 9 }} rowKey="id" />
        </div>
    )
}

export default OrderQueue