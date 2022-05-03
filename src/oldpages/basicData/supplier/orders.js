import React from 'react'
import { Table, Button, Input, Space } from 'antd';
import './index.less'
import SupplierContainer from '../../../container/basicData/supplier/index'
import { SearchBanner } from '../../../components/commonSearch'
import history from '../../../history'

//表格
function TableFun() {
    let supplier = SupplierContainer.useContainer();
    const data = supplier.ordersData || [];
    const columns = [
        { title: '下单日期', dataIndex: 'date', key: 'date', ellipsis: true, align: 'center' },
        { title: 'sku_code', dataIndex: 'sku_code', key: 'sku_code', ellipsis: true, align: 'center' },
        // { title: '数量', dataIndex: 'amount', key: 'amount', ellipsis: true, align: 'center' },
        { title: '价格', dataIndex: 'price', key: 'price', ellipsis: true, align: 'center' },
        { title: '供应商名称', dataIndex: 'supplier', key: 'supplier', ellipsis: true, align: 'center' },
        // { title: '送货司机', dataIndex: 'driver', key: 'driver', ellipsis: true, align: 'center' },
        { title: '车牌号', dataIndex: 'car', key: 'car', ellipsis: true, align: 'center' },
        { title: '联系电话', dataIndex: 'phone', key: 'phone', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg">确认</Button>
                </Space>
            ),
        },
    ]
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
            <SearchBanner initialData={supplier.iniOrdersData} setData={supplier.setOrdersData} param={'SUPPLYORDER'}/>
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
