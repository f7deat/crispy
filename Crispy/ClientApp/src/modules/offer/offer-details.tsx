import { Button, DatePicker, Drawer, Input, InputNumber, message, Popconfirm, Select, Space, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
    DeleteOutlined,
} from '@ant-design/icons';

const { Option } = Select;

export default function OfferDetails() {

    const history = useHistory()
    const { id } = useParams<any>()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [products, setProducts] = useState([])
    const [offerDetail, setOfferDetail] = useState<any>({});
    const [offerDetails, setOfferDetails] = useState<any>();
    const [details, setDetails] = useState<any>()
    const [product, setProduct] = useState<any>({});
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get(`/api/offer/details/get/${id}`).then(response => {
            setDetails(response.data.details)
        })
    }

    function handleChangeProduct(productId: string) {
        setOfferDetail({ ...offerDetail, productId: productId })
        setProduct(products.find((x: any) => x.id === productId))
    }

    function openDrawer() {
        axios.get(`/api/product/list-all`).then(response => {
            setDrawerVisible(true)
            setProducts(response.data)
        })
    }

    function save() {
        offerDetail.offerId = Number(id);
        axios.post(`/api/offer/details/add`, offerDetail).then(response => {
            if (response.data.succeeded) {
                setDrawerVisible(false)
                fetchData();
            }
        })
    }

    function changeDelivveryDate(value: moment.Moment | null) {
        setOfferDetail({ ...offerDetail, deliveryDate: value });
    }

    function removeOffer(id: string) {
        axios.post(`/api/offer/details/delete/${id}`).then(response => {
            if (response.data.succeeded) {
                message.success(response.data.message)
                fetchData()
            } else {
                message.error(response.data.error)
            }
        })
    }

    const columns = [
        {
            title: '#',
            render: (text: any, record: any, index: number) => (
                <div>{index + 1}</div>
            )
        },
        {
            title: 'Sản phẩm',
            render: (record: any) => (
                <div>{record.products.name}</div>
            )
        },
        {
            title: 'Ngày tạo',
            render: (record: any) => (
                <div>{moment(record.items.createdDate).format('DD/MM/YYYY')}</div>
            )
        },
        {
            title: 'Số lượng',
            render: (record: any) => (
                <div>{record.items.quantity}</div>
            )
        },
        {
            title: 'Tồn kho',
            render: (record: any) => (
                <div>{record.products.unitStock}</div>
            )
        },
        {
            title: 'Đơn giá',
            render: (record: any) => (
                <div>{record.products.unitPrice}</div>
            )
        },
        {
            title: 'Tác vụ',
            render: (record: any) => (
                <Space>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => removeOffer(record.items.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    function exportExcel() {
        axios({
            url: `/api/offer/details/export/${id}`,
            method: 'POST',
            responseType: 'blob'
        }).then(response => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], { type: type })
            var url = URL.createObjectURL(blob);
            window.open(url)
        })
    }

    return (
        <div>
            <Space className="mb-3">
                <Button type="primary" onClick={() => openDrawer()}>Thêm sản phẩm</Button>
                <Button onClick={() => exportExcel()}>Xuất Excel</Button>
            </Space>
            <Table dataSource={details} columns={columns} rowKey="id" />
            <Drawer
                title="Sản phẩm"
                placement="right"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={700}
            >
                <div>Sản phẩm</div>
                <Select style={{ width: '100%' }} onChange={handleChangeProduct} className="mb-2">
                    {
                        products?.map((value: any) => (
                            <Option value={value.id} key={value.id}>{value.name}</Option>
                        ))
                    }
                </Select>
                <div className="mb-2">
                    <div>Nhãn hiệu</div>
                    <Input value={offerDetail?.code} />
                </div>
                <div className="mb-2 flex">
                    <div className="mr-2">
                        <span className="mr-2">Ngày giao hàng</span>
                        <DatePicker onChange={(value, dateString) => changeDelivveryDate(value)} />
                    </div>
                    <div>
                        <span className="mr-2">Số lượng</span>
                        <InputNumber value={offerDetail?.quantity} onChange={((value: number) => setOfferDetail({ ...offerDetail, quantity: value }))} disabled={!offerDetail.productId} max={product.unitStock} />
                    </div>
                </div>
                <div>Note</div>
                <Input.TextArea className="mb-2" value={offerDetail?.note} onChange={(value) => setOfferDetail({ ...offerDetail, note: value.target.value })} />
                <Button type="primary" onClick={() => save()}>Lưu lại</Button>
            </Drawer>
        </div>
    )
}