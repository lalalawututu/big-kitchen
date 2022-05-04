import { Table, Button, Input, Space } from 'antd';
import TeamContainer from '../../../container/basicData/team/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let team = TeamContainer.useContainer();
    const data = team.tableData || [];
    const columns = [
        { title: '班组名称', dataIndex: 'TeamName', key: 'TeamName', ellipsis: true, align: 'center' },
        { title: '上班时间', dataIndex: 'WorkStartTime', key: 'WorkStartTime', ellipsis: true, align: 'center' },
        { title: '下班时间', dataIndex: 'WorkEndTime', key: 'WorkEndTime', ellipsis: true, align: 'center' },
        { title: '负责人', dataIndex: 'HeaderName', key: 'HeaderName', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/TeamDetail',{state:{TeamId:record.TeamId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='tableList_new'>
            <Table
                rowKey={record => record.TeamId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate();
    let team = TeamContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="班组名称"
                value={team.teamName || ''}
                onChange={(evt) =>
                    team.searchInfo(evt.target.value)
                }
                onSearch={team.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn"  onClick={() => navigate('/TeamAddEdit')}>添加班组</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <TeamContainer.Provider>
                <SearchFun />
                <TableFun />
            </TeamContainer.Provider>
        </div >
    )
}
