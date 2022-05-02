import { Descriptions } from 'antd';
import assetDetail from '@/container/basicData/asset/detail'
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 资产详情
function AssetDetail() {
  let navigate = useNavigate();
  let asset = assetDetail.useContainer();
  return (
    <div className='work-information'>
      <div className='common-edit-btn' onClick={() => navigate('/AssetAddEdit', { state: { AssetsId: asset.assetDetail.AssetsId } })}><EditOutlined /></div>
      <div className='basic-info bg-fff'>
        <h2 className="common-title">基本信息：</h2>
        <Descriptions size={'default'} column={4} className="descriptions-basic">
          <Descriptions.Item label="设备名称">{asset.assetDetail.AssetsName || ''}</Descriptions.Item>
          <Descriptions.Item label="所属车间">{asset.assetDetail.WorkShopName || ''}</Descriptions.Item>
          <Descriptions.Item label="设备品牌">{asset.assetDetail.BrandName || ''}</Descriptions.Item>
          <Descriptions.Item label="设备类型">{asset.assetDetail.AssetsType || ''}</Descriptions.Item>
          <Descriptions.Item label="购买时间">{asset.assetDetail.PurchasingDate || ''}</Descriptions.Item>
          <Descriptions.Item label="保修年限">{asset.assetDetail.WarrantyPeriod || ''} </Descriptions.Item>
          <Descriptions.Item label="保养周期">{asset.assetDetail.MaintenanceCycle || ''}</Descriptions.Item>
          <Descriptions.Item label="供应商">{asset.assetDetail.SupplierName || ''}</Descriptions.Item>
          <Descriptions.Item label="采购人员">{asset.assetDetail.ProcurementStaff || ''}</Descriptions.Item>
          <Descriptions.Item label="设备说明书">{asset.assetDetail.Specification || ''}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="common-long-table bg-fff">
        <h2 className="common-title">设备图片</h2>
        {asset.assetDetail.Picture || ''}
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <assetDetail.Provider>
        <AssetDetail />
      </assetDetail.Provider>
    </div >
  )
}
