import { useState, useEffect } from 'react'
import { Table, Button, Input, Space, Tag } from 'antd';
import MeterialContainer from '../../container/basicData/material'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.less'
const { Search } = Input;
const { CheckableTag } = Tag;

//表格
function TableFun() {
    let navigate = useNavigate();
    let material = MeterialContainer.useContainer();
    const data = material.tableData || [];

    const columns = [
        { title: '原料名称', dataIndex: 'MaterialName', key: 'MaterialName', ellipsis: true, align: 'center' },
        { title: '类型', dataIndex: 'MaterialType', key: 'MaterialType', ellipsis: true, align: 'center' },
        { title: '规格', dataIndex: 'Specification', key: 'Specification', ellipsis: true, align: 'center' },
        { title: '供货商', dataIndex: 'SupplierName', key: 'SupplierName', ellipsis: true, align: 'center' },
        { title: '品牌', dataIndex: 'BrandName', key: 'BrandName', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/MaterialDetail',{state:{MaterialId:record.MaterialId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.MaterialId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate();
    let material = MeterialContainer.useContainer();
    return (
        <div>
            < div className="search-container" style={{ marginBottom: '0.1rem' }}>
                <Search
                    placeholder="物料名称"
                    value={material.searchContent.MaterialName || ''}
                    onChange={(evt) =>
                        material.searchInfo(evt.target.value)
                    }
                    onSearch={material.searchOpt}
                    prefix={<SearchOutlined />}
                    allowClear
                    enterButton="搜索" size="middle" />
                <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/MaterialAddEdit')}>添加物料</Button>
            </div>
            <div className="creator-content" style={{ padding: '0.2rem', marginBottom: '0.15rem' }}>
                <div className='wrap-line'>
                    <div className='tags-wrap' style={{ marginBottom: '0rem' }}>
                        <div className='title'>运单状态:</div>
                        <div>
                            {material.tagsType.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={material.selectedTags.indexOf(tag) > -1}
                                    onChange={checked => material.handleChange(tag)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default function Index() {
    return (
        <div className='distribution roleContent container'>
            <MeterialContainer.Provider>
                <SearchFun />
                <TableFun />
            </MeterialContainer.Provider>
        </div >
    )
}
