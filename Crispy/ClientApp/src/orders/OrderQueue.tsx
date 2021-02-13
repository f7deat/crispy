import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from 'react';
import { Link } from "react-router-dom";
import { ProductOrder } from "../models/interfaces/ProductOrder";
import { IOrderQueueProps } from "../models/props/IOrderProps"
import { PlusCircleOutlined } from '@ant-design/icons';

const OrderQueue = (props: IOrderQueueProps) => {
    const [products, setProducts] = useState<ProductOrder[]>([])
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

    const addProduct = (product: ProductOrder) => {
        product.quantity = 1;
        product.price = product.unitPrice;
        props.setProducts((current: ProductOrder[]) => [...current, product])
        setProducts(products.filter(x => x.id !== product.id))
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (text: string, record: ProductOrder) => <Link to={`/product-setting/${record.id}`}>{text}</Link>,
        },
        {
            title: 'Tác vụ',
            render: (text: any, record: ProductOrder) => <Button type="primary" onClick={() => addProduct(record)}>Thêm</Button>
        }
    ]
    return (
        <div>
            <div className="mb-2 text-right">
                <Link to="/product-seting"><Button type="primary" icon={<PlusCircleOutlined />}>Tạo sản phẩm</Button></Link>
            </div>
            <Table columns={columns} dataSource={products} rowSelection={rowSelection} pagination={{ pageSize: 5 }} rowKey="id" />
        </div>
    )
}

export default OrderQueue