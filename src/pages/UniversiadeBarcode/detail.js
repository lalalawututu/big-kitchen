import { Descriptions } from 'antd';
import materialDetail from '@/container/basicData/material/detail'
import { useNavigate, useLocation } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

// 供应商详情
function MaterialDetail() {
  let navigate = useNavigate();
  let material = materialDetail.useContainer();

  return (
    <div className="work-information">
      <div className='common-edit-btn' onClick={() => navigate('/MaterialAddEdit', { state: { MaterialId: material.materialDetail.MaterialId } })}><EditOutlined /></div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={5} className="descriptions-basic">
          <Descriptions.Item label="物料名称">{material.materialDetail.MaterialName || ''}</Descriptions.Item>
          <Descriptions.Item label="类别">{material.materialDetail.MaterialType || ''}</Descriptions.Item>
          <Descriptions.Item label="规格">{material.materialDetail.Specification || ''}</Descriptions.Item>
          <Descriptions.Item label="品牌">{material.materialDetail.BrandName || ''}</Descriptions.Item>
          <Descriptions.Item label="供应商">{material.materialDetail.SupplierName || ''}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">原料图片</h2>
        {material.materialDetail.Landline || ''}
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <materialDetail.Provider>
        <MaterialDetail />
      </materialDetail.Provider>
    </div >
  )
}
