import { Table, Button, Input, Space } from 'antd';
import AssetContainer from '../../../container/basicData/asset/index'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../index.less'
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate()
    let asset = AssetContainer.useContainer();
    const data = asset.tableData || [];
    const columns = [
        { title: '资产名称', dataIndex: 'AssetsName', key: 'AssetsName', ellipsis: true, align: 'center' },
        { title: '所在车间', dataIndex: 'WorkShopName', key: 'WorkShopName', ellipsis: true, align: 'center' },
        { title: '品牌', dataIndex: 'BrandName', key: 'BrandName', ellipsis: true, align: 'center' },
        { title: '设备类型', dataIndex: 'AssetsType', key: 'AssetsType', ellipsis: true, align: 'center' },
        { title: '操作员人数', dataIndex: 'StationTotal', key: 'StationTotal', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/AssetDetail',{state:{AssetsId:record.AssetsId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.AssetsId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate()
    let asset = AssetContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="资产名称"
                value={asset.assetName || ''}
                onChange={(evt) =>
                    asset.searchInfo(evt.target.value)
                }
                onSearch={asset.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/assetAddEdit')}>添加资产</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <AssetContainer.Provider>
                <SearchFun />
                <TableFun />
            </AssetContainer.Provider>
        </div >
    )
}
