import { Table, Button, Input, Space } from 'antd';
import SupplierContainer from "../../container/supplierContract";
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

//表格
function TableFun() {
    let navigate = useNavigate();
    let brand = SupplierContainer.useContainer();
    const data = brand.tableData || [];
    const columns = [
        { title: '合同编号', dataIndex: 'BrandName', key: 'BrandName', ellipsis: true, align: 'center' },
        { title: '供应商名称', dataIndex: 'BrandType', key: 'BrandType', ellipsis: true, align: 'center' },
        { title: '签订日期', dataIndex: 'LogoUrl', key: 'LogoUrl', ellipsis: true, align: 'center' },
        { title: '合同有效期', dataIndex: 'BrandType', key: 'BrandType', ellipsis: true, align: 'center' },
        { title: '负责人', dataIndex: 'LogoUrl', key: 'LogoUrl', ellipsis: true, align: 'center' },
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
                placeholder="品牌/供货商/code"
                value={brand.brandName || ''}
                onChange={(evt) =>
                    brand.searchInfo(evt.target.value)
                }
                onSearch={brand.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="搜索" size="middle" />
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => navigate('/supplier/contractsAdd')}>添加合同</Button>
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
