import { Table, Button, Input, Space, Tag } from 'antd';
import RoleContainer from '../../../container/basicData/role/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let role = RoleContainer.useContainer();
    const data = role.tableData || [];
    const columns = [
        { title: '一级部门', dataIndex: 'FirstDeptName', key: 'FirstDeptName', ellipsis: true, align: 'center' },
        { title: '二级部门', dataIndex: 'SecondDeptName', key: 'SecondDeptName', ellipsis: true, align: 'center' },
        {
            title: '访问权限', key: 'Power', dataIndex: 'Power',
            render: Power => (
                <>
                    {Power.map(tag => {
                        let color = 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/RoleDetail',{state:{RoleId:record.RoleId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.RoleId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate()
    let role = RoleContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="部门名称"
                value={role.deptName || ''}
                onChange={(evt) =>
                    role.searchInfo(evt.target.value)
                }
                onSearch={role.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/RoleAddEdit')}>添加角色</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <RoleContainer.Provider>
                <SearchFun />
                <TableFun />
            </RoleContainer.Provider>
        </div >
    )
}
