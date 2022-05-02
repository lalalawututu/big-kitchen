import React from 'react'
import { Table, Button, Input, Space, Tag, Modal } from 'antd';
import './index.less'
import PersonnelContainer from '../../../container/basicData/personnel/index'
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;


// 头部
function HeaderFun() {
    return (
        <div className='header'>
            <div>人员管理</div>
        </div>
    )
}

//表格
function TableFun() {
    let personnel = PersonnelContainer.useContainer();
    const data = personnel.tableData || [];
    const columns = [
        { title: '姓名', dataIndex: 'Name', key: 'Name', ellipsis: true, align: 'center' },
        { title: '性别', dataIndex: 'Sex', key: 'Sex', ellipsis: true, align: 'center' },
        { title: '班组', dataIndex: 'Team', key: 'Team', ellipsis: true, align: 'center' },
        {
            title: '工种', dataIndex: 'EmployeePosition', key: 'EmployeePosition', ellipsis: true, align: 'center',
            render: (text) => {
                return text ? text.split('#').join(',') : ''
            }
        },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    {/* <Link to={`/PersonnelAddEdit`}>修改工种</Link> */}
                    <Button className="common-btn-bg">修改工种</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.EmployeeId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let personnel = PersonnelContainer.useContainer();
    return (
        <div className="search-container">
			<Search
				placeholder="人员姓名"
				value={personnel.Name || ''}
				onChange={(evt) =>
					personnel.searchInfo(evt.target.value)
				}
				onSearch={personnel.searchOpt}
				prefix={<SearchOutlined />}
				allowClear
				enterButton="搜索" size="middle" />
		</div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <PersonnelContainer.Provider>
                {/* <HeaderFun />*/}
                <SearchFun />
                <TableFun />
            </PersonnelContainer.Provider>
        </div >
    )
}
