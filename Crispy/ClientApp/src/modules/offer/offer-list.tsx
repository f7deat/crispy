import { Button, Drawer, Input, Popconfirm, Select, Space, Table } from "antd"
import React, { useEffect, useState } from "react"
import {
  PlusOutlined,
  DeleteOutlined,
  FolderOutlined
} from '@ant-design/icons';
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { ROLE_NAME } from "../../roles/constants/role-constant";

const { Option } = Select;

const OfferList = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [offer, setOffer] = useState({})
  const [offers, setOffers] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    featchData();
  }, [])

  const featchCustomers = async () => await axios.get(`/api/account/get-users-in-role/${ROLE_NAME.CUSTOMER}`)

  const featchData = () => {
    axios.get(`/api/offer/get-list`).then(response => {
      setOffers(response.data);
    })
  }

  function removeOffer(id: number) {
    axios.post(`/api/offer/delete/${id}`).then(response => {
      featchData();
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
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      render: (value: Date) => (
        <div>{moment(value).format('DD/MM/YYYY')}</div>
      )
    },
    {
      title: 'Tác vụ',
      render: (record: any) => (
        <Space>
          <Link to={`/modules/offer/details/${record.id}`}>
            <Button icon={<FolderOutlined />} type="primary"></Button>
          </Link>
          <Popconfirm
            title="Are you sure to delete this?"
            onConfirm={() => removeOffer(record.id)}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} danger></Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  function save() {
    axios.post('/api/offer/add', offer).then(response => {
      if (response.data.succeeded) {
        featchData();
        setDrawerVisible(false);
      }
    })
  }

  async function openDrawer() {
    const response = await featchCustomers();
    setCustomers(response.data);
    setDrawerVisible(true)
  }

  function handleChangeCustomer(value: string) {
    setOffer({ ...offer, customerId: value })
  }

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openDrawer()}>Tạo offer</Button>
      </div>

      <Table dataSource={offers} columns={columns} rowKey="id" />

      <Drawer
        title="Tạo Offer"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={700}
      >
        <div>Tên</div>
        <Input onChange={(e: any) => setOffer({ ...offer, name: e.target.value })} className="mb-2" /><div>Customer</div>
        <Select style={{ width: '100%' }} onChange={handleChangeCustomer} className="mb-2">
          {
            customers?.map((value: any) => (
              <Option value={value.id} key={value.id}>{value.name}</Option>
            ))
          }
        </Select>
        <Space>
          <Button type="primary" onClick={() => save()}>Lưu lại</Button>
          <Button onClick={() => setDrawerVisible(false)}>Đóng</Button>
        </Space>
      </Drawer>
    </div>
  )
}

export default OfferList