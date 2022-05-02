import React from 'react'
import { Table, Button, Input, Space } from 'antd';
import QualityContainer from '../../../container/basicData/quality/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let quality = QualityContainer.useContainer();
    const data = quality.tableData || [];
    const columns = [
        { title: '质检标准号', dataIndex: 'StandardId', key: 'StandardId', ellipsis: true, align: 'center' },
        { title: '标准名称', dataIndex: 'StandardName', key: 'StandardName', ellipsis: true, align: 'center' },
        { title: '标准描述', dataIndex: 'StandardDescription', key: 'StandardDescription', ellipsis: true, align: 'center' },
        { title: '质检标准', dataIndex: 'problems', key: 'problems', ellipsis: true, align: 'center' },
        { title: '体系', dataIndex: 'System', key: 'System', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                     <Button className="common-btn-bg">查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.StandardId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate();
    let quality = QualityContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="质检标准"
                value={quality.standardName || ''}
                onChange={(evt) =>
                    quality.searchInfo(evt.target.value)
                }
                onSearch={quality.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/QualityStandardAddEdit')}>添加质检标准</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <QualityContainer.Provider>
                <SearchFun />
                <TableFun />
            </QualityContainer.Provider>
        </div >
    )
}
