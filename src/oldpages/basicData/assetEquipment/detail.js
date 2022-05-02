import { Descriptions, Table } from 'antd';
import assetDetail from '@/container/basicData/assetEquipment/detail'
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 资产详情
function AssetDetail() {
    let navigate = useNavigate();
    let asset = assetDetail.useContainer();
    const columns = [
        { title: '工位', dataIndex: 'StationName', key: 'StationName', width: 400 },
        { title: '岗位', dataIndex: 'Jobs', key: 'People' },
    ]
    return (
        <div className='work-information'>
            <div className='common-edit-btn' onClick={() => navigate('/AssetEquipmentAddEdit', { state: { AssetsEquipmentId: asset.assetDetail.AssetsEquipmentId } })}><EditOutlined /></div>
            <div className="basic-info bg-fff">
                <h2 className="common-title">基本信息</h2>
                <Descriptions size={'default'} column={4} className="descriptions-basic">
                    <Descriptions.Item label="设备编号">{asset.assetDetail.AssetsEquipmentId || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备名称">{asset.assetDetail.AssetsEquipmentName || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备类型">{asset.assetDetail.AssetsEquipmentType || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备状态">{asset.assetDetail.AssetsEquipmentStatus || ''} </Descriptions.Item>
                    <Descriptions.Item label="规格型号">{asset.assetDetail.Specification || ''} </Descriptions.Item>
                    <Descriptions.Item label="来源">{asset.assetDetail.Source || ''} </Descriptions.Item>
                    <Descriptions.Item label="供应商">{asset.assetDetail.SupplierName || ''} </Descriptions.Item>
                    <Descriptions.Item label="品牌">{asset.assetDetail.BrandName || ''} </Descriptions.Item>
                    <Descriptions.Item label="所属公司">{asset.assetDetail.Company || ''} </Descriptions.Item>
                    <Descriptions.Item label="使用部门">{asset.assetDetail.Department || ''} </Descriptions.Item>
                    <Descriptions.Item label="使用人">{asset.assetDetail.User || ''} </Descriptions.Item>
                    <Descriptions.Item label="存放区域">{asset.assetDetail.DepositRegion || ''} </Descriptions.Item>
                    <Descriptions.Item label="使用年限">{asset.assetDetail.Department || ''} </Descriptions.Item>
                    <Descriptions.Item label="采购日期">{asset.assetDetail.PurchaseDate || ''} </Descriptions.Item>
                    <Descriptions.Item label="采购单价">{asset.assetDetail.Price || ''} </Descriptions.Item>
                    <Descriptions.Item label="维保商">{asset.assetDetail.MaintenanceProvider || ''} </Descriptions.Item>
                    <Descriptions.Item label="维保状态">{asset.assetDetail.MaintenanceState || ''} </Descriptions.Item>
                    <Descriptions.Item label="脱保日期">{asset.assetDetail.ExpiryDate || ''} </Descriptions.Item>
                </Descriptions>
            </div>

            <div className="common-long-table bg-fff">
                <h2 className="common-title">设备图片</h2>
                {asset.assetDetail.Picture || ''}
            </div>

            <div className="common-long-table bg-fff">
                <h2 className="common-title">附件</h2>
                {asset.assetDetail.Attachment || ''}
            </div>

            <div className="common-long-table bg-fff">
                <h2 className="common-title">工位信息</h2>
                <Table columns={columns} dataSource={asset.assetDetail.Station} />
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
