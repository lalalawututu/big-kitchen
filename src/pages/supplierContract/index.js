import { Table, Button, Space } from 'antd';
import SupplierContainer from "../../container/supplierContract";
import { DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {SearchBanner} from "../../components/searchContentOr";

//表格
function TableFun() {
    let navigate = useNavigate();
    let supplier = SupplierContainer.useContainer();
    const data = supplier.contractData || [];
    const columns = [
        { title: '合同编号', dataIndex: 'contract_code', key: 'contract_code', ellipsis: true, align: 'center' },
        { title: '合同名称', dataIndex: 'contract_name', key: 'contract_name', ellipsis: true, align: 'center' },
        { title: '供应商', dataIndex: 'supplier_name', key: 'supplier_name', ellipsis: true, align: 'center' },
        { title: '签订日期', dataIndex: 'sign_at', key: 'sign_at', ellipsis: true, align: 'center' },
        { title: '合同截止日', dataIndex: 'expired_at', key: 'expired_at', ellipsis: true, align: 'center' },
        { title: '负责人', dataIndex: 'manager_id', key: 'manager_id', ellipsis: true, align: 'center' },
        {
            title: '合同附件', key: 'option', align: 'center', width: 200,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/supplier/contractsAdd',{state:{contractCode:record.contract_code}})}>查看</Button>
                    <Button className="common-btn-bg" onClick={() => supplier.downFile(record)}>下载</Button>
                </Space>
            ),
        },
        {
            title: '详细', key: 'option', align: 'center', width: 180,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/supplier/contractsAdd',{state:{contractCode:record.contract_code}})}>修改</Button>
                </Space>
            ),
        },
    ]
    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.contract_code}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

//搜索
function SearchFun() {
    let navigate = useNavigate()
    let suppliers = SupplierContainer.useContainer();
    return (
        <div className="search-container">
            <SearchBanner
                placeHolder="合同编号 | 合同名称 ｜ 供应商名称"
                initialData={suppliers.fullData}
                setData={suppliers.setContractData}
                searchKeys={['contract_code', 'contract_name', 'supplier_name']}
            />
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
