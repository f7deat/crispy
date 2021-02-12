import { Button, Col, Form, Input, InputNumber, message, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Link, Redirect, useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingOutlined, PlusOutlined, InfoCircleOutlined, SaveOutlined } from '@ant-design/icons';

const ProductSetting = () => {

    const { id } = useParams();
    const [fields, setFields] = useState(null)
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                let response = await axios.get(`/api/product/find/${id}`);
                setFields([
                    {
                        name: 'id',
                        value: response.data.id
                    },
                    {
                        name: 'name',
                        value: response.data.name
                    },
                    {
                        name: 'description',
                        value: response.data.description
                    },
                    {
                        name: 'content',
                        value: response.data.content
                    },
                    {
                        name: 'unitPrice',
                        value: response.data.unitPrice
                    },
                    {
                        name: 'unitStock',
                        value: response.data.unitStock
                    },
                    {
                        name: 'createdDate',
                        value: response.data.createdDate
                    },
                    {
                        name: 'createdBy',
                        value: response.data.createdBy
                    },
                ])
            }
            fetchData();
        }
    }, [id])

    const handleFinish = (values) => {
        if (id) {
            axios.post('/api/product/update', values).then(response => {
                if (response.data.succeeded) {
                    message.info('Cập nhật sản phẩm thành công!');
                } else {
                    message.error(response.data.error);
                }
            })
        } else {
            axios.post('/api/product/add', values).then(response => {
                if (response.data) {
                    message.info('Tạo sản phẩm thành công!');
                    return <Redirect to="/product-list" />;
                } else {
                    message.error('Tạo sản phẩm thất bại!');
                }
            })
        }
    }

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.filelist;
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                    setLoading(false);
                    setImageUrl(imageUrl);
                }
            );
        }
    };

    return (
        <div className="p-4">
            <div className="p-4 bg-white">
                <Title level={3}>Sản phẩm</Title>
                <Form layout="vertical" onFinish={handleFinish} fields={fields}>
                    <Form.Item name="id" hidden />
                    <Form.Item name="createdDate" hidden />
                    <Form.Item name="createdBy" hidden />
                    <Row>
                        <Col span={6}>
                            <Form.Item
                                name="upload"
                                label="Hình ảnh"
                                valuePropName="filelist"
                                getValueFromEvent={normFile}
                                tooltip={{ title: 'Nâng cấp lên phiên bản Premium để upload từ 2 ảnh trở lên!', icon: <InfoCircleOutlined /> }}
                            >
                                <div className="flex">
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={18}>
                            <Form.Item label="Tên sản phẩm" name="name" >
                                <Input placeholder="Tên sản phẩm" />
                            </Form.Item>
                            <Form.Item label="Mô tả" name="description" >
                                <Input.TextArea placeholder="Mô tả" rows={3} />
                            </Form.Item>
                            <Form.Item label="Nội dung" name="content">
                                <Input.TextArea placeholder="Nội dung" rows={4} />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item label="Đơn giá" name="unitPrice" className="mr-4 inline-block">
                                    <InputNumber placeholder="Đơn giá" />
                                </Form.Item>
                                <Form.Item label="Kho" name="unitStock" className="inline-block">
                                    <InputNumber placeholder="Kho" />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item className="text-right">
                        <Button type="default" htmlType="button" className="mr-2"><Link to="/product-list">Quay lại</Link></Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Cập nhật thông tin</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ProductSetting