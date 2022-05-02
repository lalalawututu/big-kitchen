import React from 'react'
import { Descriptions, Table } from 'antd';
import assetDetail from '@/container/basicData/assetEquipment/detail'

// 设备详情
function EquipmentDetail() {
    let asset = assetDetail.useContainer();
    return (
        <div className='work-information'>
            <div className="basic-info bg-fff">
                <h2 className="common-title">基本信息</h2>
                <Descriptions size={'default'} column={4} className="descriptions-basic">
                    <Descriptions.Item label="设备名称">{asset.assetDetail.AssetsEquipmentId || ''} </Descriptions.Item>
                    <Descriptions.Item label="所属车间">{asset.assetDetail.AssetsEquipmentName || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备品牌">{asset.assetDetail.AssetsEquipmentType || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备类型">{asset.assetDetail.AssetsEquipmentStatus || ''} </Descriptions.Item>
                </Descriptions>
            </div>

            <div className="common-long-table bg-fff">
                <h2 className="common-title">设备信息</h2>
                <Descriptions size={'default'} column={4} className="descriptions-basic">
                    <Descriptions.Item label="购买时间">{asset.assetDetail.AssetsEquipmentId || ''} </Descriptions.Item>
                    <Descriptions.Item label="保修年限">{asset.assetDetail.AssetsEquipmentName || ''} </Descriptions.Item>
                    <Descriptions.Item label="保养周期">{asset.assetDetail.AssetsEquipmentType || ''} </Descriptions.Item>
                    <Descriptions.Item label="供应商">{asset.assetDetail.AssetsEquipmentStatus || ''} </Descriptions.Item>
                    <Descriptions.Item label="采购人员">{asset.assetDetail.AssetsEquipmentStatus || ''} </Descriptions.Item>
                    <Descriptions.Item label="设备说明书">{asset.assetDetail.AssetsEquipmentStatus || ''} </Descriptions.Item>
                </Descriptions>
            </div>
           
        </div>
    )
}

export default function detail() {
    return (
        <div className='supplierIndex'>
            <assetDetail.Provider>
                <EquipmentDetail />
            </assetDetail.Provider>
        </div >
    )
}
