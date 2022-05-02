import { Descriptions } from 'antd';
import qualityDetail from '@/container/basicData/quality/detail'

// 质检标准详情
function QualityDetail() {
  let quality = qualityDetail.useContainer();
  return (
    <div className="work-information">
      <div className="basic-info bg-fff">
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={5} className="descriptions-basic">
          <Descriptions.Item label="标准序号">{quality.qualityDetail.StandardId || ''}</Descriptions.Item>
          <Descriptions.Item label="标准名称">{quality.qualityDetail.StandardName || ''}</Descriptions.Item>
          <Descriptions.Item label="工序">{quality.qualityDetail.WorkingProcedureName || ''}</Descriptions.Item>
          <Descriptions.Item label="体系">{quality.qualityDetail.System || ''}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{quality.qualityDetail.CreateTime || ''}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">不合格问题</h2>
        {quality.qualityDetail.NonconformityProblem || ''}
      </div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">标准执行文件</h2>
        {quality.qualityDetail.StandardFile || ''}
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <qualityDetail.Provider>
        <QualityDetail />
      </qualityDetail.Provider>
    </div >
  )
}
