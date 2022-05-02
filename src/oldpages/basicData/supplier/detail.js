import { Descriptions } from 'antd';
import supplierDetail from '@/container/basicData/supplier/detail'
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

// 供应商详情
function SupplierDetail() {
  let navigate = useNavigate();
  let supplier = supplierDetail.useContainer();
  return (
    <div className="work-information">
      <div className='common-edit-btn' onClick={() => navigate('/supplierAdd', { state: { SupplierId: supplier.supplierDetail.SupplierId } })}><EditOutlined /></div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={3} className="descriptions-basic">
          <Descriptions.Item label="供应商名称">{supplier.supplierDetail.SupplierName || ''}</Descriptions.Item>
          <Descriptions.Item label="品牌">{supplier.supplierDetail.BrandName || ''}</Descriptions.Item>
          <Descriptions.Item label="地址">{supplier.supplierDetail.Address || ''}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">联系方式</h2>
        <Descriptions size={'default'} column={5} className="descriptions-basic">
          <Descriptions.Item label="座机">{supplier.supplierDetail.Landline || ''}</Descriptions.Item>
          <Descriptions.Item label="传真">{supplier.supplierDetail.Fax || ''}</Descriptions.Item>
          <Descriptions.Item label="手机">{supplier.supplierDetail.Phone || ''}</Descriptions.Item>
          <Descriptions.Item label="联系人">{supplier.supplierDetail.Linkman || ''}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{supplier.supplierDetail.Email || ''}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <supplierDetail.Provider>
        <SupplierDetail />
      </supplierDetail.Provider>
    </div >
  )
}
