import React from "react";
import {Button, Space, Table} from 'antd';
import stockListContainer from "../../../../container/stock/stockList";
import From from "./from";

const TabContent = props => {
    let materials = stockListContainer.useContainer()
    const columns = [
        {
            title: 'sku',
            dataIndex: 'skuCode',
            key: 'skuCode',
        },
        {
            title: '批次',
            dataIndex: 'batch',
            key: 'batch',
        },
        {
            title: '货位',
            dataIndex: 'position',
            key: 'position',
        },
        // {
        //     title: '供货商',
        //     dataIndex: 'supplier',
        //     key: 'supplier',
        // },
        {
            title: '仓库',
            dataIndex: 'stockName',
            key: 'stockName',
            // align: 'center'
        },
        {
            title: '库存(kg)',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: '最低库存(kg)',
            dataIndex: 'min',
            key: 'min',
            sorter: (a, b) => a.min - b.min,
        },
        {
            title: '剩余保质期(天)',
            dataIndex: 'expired',
            key: 'expired',
            sorter: (a, b) => a.expired - b.expired,
        },
        // {
        //     title: '出入库记录',
        //     dataIndex: '',
        //     key: 'x',
        //     render: () => (
        //         <Space size="middle">
        //             <Button className="common-btn-bg">查看出入库记录</Button>
        //         </Space>
        //     ),
        // },
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
