import React from "react";
import { Table } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const TabContent = props => {
    const columns = [
        {
            title: '名称',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: '所属仓库',
            dataIndex: 'Warehouse',
            key: 'Warehouse',
        },
        {
            title: '库存（吨）',
            dataIndex: 'InventoryCompany',
            key: 'InventoryCompany',
            // align: 'center'
        },
        {
            title: '库存量',
            dataIndex: 'Inventory',
            key: 'Inventory',
        },
        {
            title: '安全库存',
            dataIndex: 'SafetyStock',
            key: 'SafetyStock',
        },
        {
            title: '最后修改时间',
            dataIndex: 'LastModificationTime',
            key: 'LastModificationTime',
        },
        {
            title: '最后修改人员',
            dataIndex: 'LastModifiedBy',
            key: 'LastModifiedBy',
        },
        {
            title: '设置',
            dataIndex: '',
            align: 'center',
            render: obj => <SettingOutlined className="setting-icon" onClick={() => props.setSafeStock(obj.SafetyStockId)} />,
        },
    ];
    return (
        <div className='common-long-table' style={{ marginTop: '0.2rem' }}>
            <Table
                columns={columns}
                dataSource={props.tableList}
                rowKey={dataSource => dataSource.SafetyStockId}
            />
        </div>
    )
}

export default TabContent