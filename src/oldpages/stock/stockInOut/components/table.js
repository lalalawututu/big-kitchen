import React from "react";
import { Table } from 'antd';
import From from "./from";
import StockInOutContainer from '../../../../container/stock/stockInOut'

const TabContent = props => {
    let materials = StockInOutContainer.useContainer()
    const columns = [
        {
            title: '出入库时间',
            dataIndex: 'time',
            key: 'time',
            sorter: (a, b) => a.time - b.time,
        },
        {
            title: '名称',
            dataIndex: 'skuCode',
            key: 'skuCode',
            // align: 'center'
        },
        {
            title: '供货商',
            dataIndex: 'SupplierId',
            key: 'SupplierId',
        },
        {
            title: '出入库',
            dataIndex: 'StockInOut',
            key: 'StockInOut',
        },
        {
            title: '所属仓库',
            dataIndex: 'stockName',
            key: 'stockName',
        },
        {
            title: '重量（吨）',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: '操作员',
            dataIndex: 'employeeId',
            key: 'employeeId',
        },
    ];
    return (
        <div className='common-long-table'  style={{ marginTop: '0.2rem' }}>
            <From stocks={materials.stockInfo} />
            <Table
                columns={columns}
                dataSource={materials.data}
                rowKey={dataSource => dataSource.key}
            />
        </div>
    )
}

export default TabContent
