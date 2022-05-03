import React from 'react'
import { Table, Button, Input, Space } from 'antd';
import './index.less'
import SupplierContainer from '../../../container/basicData/supplier/index'
import { SearchBanner } from '../../../components/searchContentOr'
import history from '../../../history'

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
            title: '评级积分',
            dataIndex: 'score',
            key: 'score',
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
            <SearchBanner initialData={supplier.iniTableData} setData={supplier.setTableData} searchKeys={['supplier_name', 'linkman']}/>
        </div>
    )
}

export default function Estimate() {
    return (
        <div className='supplierIndex container'>
            <SupplierContainer.Provider>
                <SearchFun />
                <TableFun />
            </SupplierContainer.Provider>
        </div >
    )
}
