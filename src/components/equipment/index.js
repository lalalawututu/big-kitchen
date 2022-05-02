import React from 'react'
import { Table, Button, Input, Space } from 'antd';
// import BrandContainer from '@/container/basicData/brand/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import history from '@/history'
const { Search } = Input;

//表格
function TableFun() {
    // let brand = BrandContainer.useContainer();
    // const data = brand.tableData || [];
    const columns = [
        { title: '设备名称', dataIndex: 'EquipmentName', key: 'EquipmentName', ellipsis: true, align: 'center' },
        { title: '所在车间', dataIndex: 'Workshop', key: 'Workshop', ellipsis: true, align: 'center' },
        { title: '品牌', dataIndex: 'Brand', key: 'Brand', ellipsis: true, align: 'center' },
        { title: '设备类型', dataIndex: 'EquipmentType', key: 'EquipmentType', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg">查看</Button>
                </Space>
            ),
        },
    ]
    const data = [{
        'EquipmentName': '万事达分割机A',
        'Workshop': '二层车间',
        'Brand': '万事达',
        'EquipmentType': '切割'
    }, {
        'EquipmentName': '万事达分割机B',
        'Workshop': '二层车间',
        'Brand': '万事达',
        'EquipmentType': '清洗/消毒'
    }]
    return (
        <div className='common-long-table'>
            <Table
                // rowKey={record => record.BrandId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    // let brand = BrandContainer.useContainer();
    const create = () => {
        history.push(`/EquipmentAddEdit`);
    }
    return (
        <div className="search-container">
            <Search
                placeholder="设备名称"
                // value={brand.brandName || ''}
                // onChange={(evt) =>
                //     brand.searchInfo(evt.target.value)
                // }
                // onSearch={brand.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => create()}>添加设备</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            {/* <BrandContainer.Provider> */}
                <SearchFun />
                <TableFun />
            {/* </BrandContainer.Provider> */}
        </div >
    )
}
