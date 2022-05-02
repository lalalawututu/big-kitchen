import { Descriptions } from 'antd';
import personnelDetail from '@/container/basicData/personnel/detail'

// 供应商详情
function PersonnelDetail() {
  let personnel = personnelDetail.useContainer();
  return (
    <div className="work-information">
      <div className="basic-info bg-fff">
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={3} className="descriptions-basic">
          <Descriptions.Item label="人员姓名">{personnel.personnelDetail.Name || ''}</Descriptions.Item>
          <Descriptions.Item label="工种">{personnel.personnelDetail.EmployeePosition || ''}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <personnelDetail.Provider>
        <PersonnelDetail />
      </personnelDetail.Provider>
    </div >
  )
}
