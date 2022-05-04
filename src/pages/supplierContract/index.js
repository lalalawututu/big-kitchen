import { Table, Button, Input, Space } from 'antd';
import SupplierContainer from "../../container/supplier";
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let brand = SupplierContainer.useContainer();
    const data = brand.tableData || [];
    const columns = [
        { title: '品牌名称', dataIndex: 'BrandName', key: 'BrandName', ellipsis: true, align: 'center' },
        { title: '类别', dataIndex: 'BrandType', key: 'BrandType', ellipsis: true, align: 'center' },
        { title: 'LOGO', dataIndex: 'LogoUrl', key: 'LogoUrl', ellipsis: true, align: 'center' },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/BrandDetail',{state:{BrandId:record.BrandId}})}>查看</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.BrandId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate()
    let brand = SupplierContainer.useContainer();
    return (
        <div className="search-container">
            <Search
                placeholder="品牌名称"
                value={brand.brandName || ''}
                onChange={(evt) =>
                    // console.log(evt,99999999999)
                    brand.searchInfo(evt.target.value)
                }
                onSearch={brand.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/BrandAddEdit')}>添加品牌</Button>
        </div>
    )
}

export default function Index() {
    return (
        <div className='supplierIndex container'>
            <SupplierContainer.Provider>
                <SearchFun />
                <TableFun />
            </SupplierContainer.Provider>
        </div >
    )
}
