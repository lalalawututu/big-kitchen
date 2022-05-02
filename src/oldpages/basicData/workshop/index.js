import { Table, Button, Input, Space } from 'antd';
import WorkshopContainer from '../../../container/basicData/workshop/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let workshop = WorkshopContainer.useContainer();
    const data = workshop.tableData || [];
    const columns = [
        { title: '车间名称', dataIndex: 'WorkShopName', key: 'WorkShopName', ellipsis: true, align: 'center' },
        { title: '楼层', dataIndex: 'Floor', key: 'Floor', ellipsis: true, align: 'center' },
        { title: '面积', dataIndex: 'Area', key: 'Area', ellipsis: true, align: 'center' },
        { title: '容纳工人数量', dataIndex: 'EmployeeNum', key: 'EmployeeNum', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/WorkshopDetail',{state:{WorkShopId:record.WorkShopId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.WorkShopId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate();
    let workshop = WorkshopContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="车间名称"
                value={workshop.workShopName || ''}
                onChange={(evt) =>
                    workshop.searchInfo(evt.target.value)
                }
                onSearch={workshop.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={()=>{navigate('/WorkshopAddEdit')}}>添加车间</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <WorkshopContainer.Provider>
                <SearchFun />
                <TableFun />
            </WorkshopContainer.Provider>
        </div >
    )
}
