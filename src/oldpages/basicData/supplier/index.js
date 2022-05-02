import React from 'react'
import { Table, Button, Input, Space } from 'antd';
import './index.less'
import SupplierContainer from '../../../container/basicData/supplier/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import history from '../../../history'
const { Search } = Input;

//表格
function TableFun() {
    let supplier = SupplierContainer.useContainer();
    const data = supplier.tableData || [];
    const columns = [
        {
            title: '名称',
            dataIndex: 'supplier_name',
            key: 'supplier_name',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '品牌',
            dataIndex: 'brand_name',
            key: 'brand_name',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '积分',
            dataIndex: 'score',
            key: 'score',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '联系人',
            dataIndex: 'linkman',
            key: 'linkman',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '座机',
            dataIndex: 'landline',
            key: 'landline',
            ellipsis: true,
            align: 'center',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            align: 'center',
        },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg">评级</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.SupplierId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let supplier = SupplierContainer.useContainer();
    const create = () => {
        history.push(`/supplierAdd`);
    }
    return (
        <div className="search-container">
            <Search
                placeholder="供货商名称"
                value={supplier.searchKey || ''}
                onChange={(evt) =>
                    supplier.searchInfo(evt.target.value)
                }
                onSearch={supplier.searchSupplier}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => create()}>添加供应商</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <SupplierContainer.Provider>
                <SearchFun />
                <TableFun />
            </SupplierContainer.Provider>
        </div >
    )
}
