import {Table, Button, Input, Space, Tag, DatePicker} from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.less'
import universiadeContainer from "../../container/Universiade";
const { Search } = Input;
const { CheckableTag } = Tag;

//表格
function TableFun() {
    let navigate = useNavigate();
    let material = universiadeContainer.useContainer();
    const data = material.routesData || [];

    const columns = [
        { title: '菜品', dataIndex: 'skuCode', key: 'skuCode', ellipsis: true, align: 'center' },
        { title: '司机', dataIndex: 'driver', key: 'driver', ellipsis: true, align: 'center' },
        { title: '车辆', dataIndex: 'carNo', key: 'carNo', ellipsis: true, align: 'center' },
        { title: '地址', dataIndex: 'address', key: 'address', ellipsis: true, align: 'center' },
        {
            title: '上报', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/MaterialDetail',{state:{skuCode:record.skuCode}})}>上报</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.skuCode}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    return (
        <div>
            <div className='tags-wrap'>
                <div className='title'>按天查询</div>
                <div className='flex'>
                    <Tag className='active'>今天</Tag>
                    <Tag className='active'>昨天</Tag>
                    <DatePicker className='field-date' />
                    <Button type="primary" className='btn'>确定</Button>
                </div>
            </div>
        </div>
    )
}

export default function UniversiadeMenu() {
    return (
        <div className='distribution roleContent container'>
            <universiadeContainer.Provider>
                <SearchFun />
                <TableFun />
            </universiadeContainer.Provider>
        </div >
    )
}
