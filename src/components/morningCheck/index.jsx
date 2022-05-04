import { Table, Input } from 'antd';
import MorningCheckContainer from '../../container/morningCheck'
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
const { Search } = Input;

//搜索
function SearchFun() {
    let morningCheck = MorningCheckContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder=""
                // value={asset.assetName || ''}
                // onChange={(evt) =>
                //     asset.searchInfo(evt.target.value)
                // }
                // onSearch={asset.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
        </div>
    )
}

//表格
function TableFun() {
    let morningCheck = MorningCheckContainer.useContainer();
    const columns = [
        { title: '姓名', dataIndex: 'name', key: 'name', ellipsis: true, align: 'center' },
        { title: '性别', dataIndex: 'sex', key: 'sex', ellipsis: true, align: 'center' },
        { title: '工号', dataIndex: 'jobNumber', key: 'jobNumber', ellipsis: true, align: 'center' },
        { title: '晨检结果', dataIndex: 'results', key: 'results', ellipsis: true, align: 'center' },
        { title: '照片', dataIndex: 'picture', key: 'picture', ellipsis: true, align: 'center' },
    ]
    return (
        <div className='tableList_new'>
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={morningCheck.data}
            />
        </div>
    )
}

export default function MorningCheck() {
    return (
        <div className='container'>
            <SearchFun />
            <TableFun />
        </div>
    )
}
