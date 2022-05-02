import { Descriptions } from 'antd';
import workshopDetail from '@/container/basicData/workshop/detail'
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

// 车间详情
function WorkshopDetail() {
  let location = useLocation();
  let WorkShopId = location.state ? location.state.WorkShopId : ''; //车间id
  let workshop = workshopDetail.useContainer();
  let navigate = useNavigate();

  return (
    <div className="work-information">
      <div className='common-edit-btn' onClick={() => navigate('/WorkshopAddEdit', { state: { WorkShopId: WorkShopId } })}><EditOutlined /></div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={4} className="descriptions-basic">
          <Descriptions.Item label="车间名称">{workshop.workshopDetail.WorkShopName || ''}</Descriptions.Item>
          <Descriptions.Item label="所在楼层">{workshop.workshopDetail.Floor || ''}</Descriptions.Item>
          <Descriptions.Item label="面积">{workshop.workshopDetail.Area || ''}</Descriptions.Item>
          <Descriptions.Item label="容纳员工">{workshop.workshopDetail.EmployeeNum || '0'}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className="basic-info bg-fff">
        <h2 className="common-title">车间位置图</h2>

      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex'>
      <workshopDetail.Provider>
        <WorkshopDetail />
      </workshopDetail.Provider>
    </div >
  )
}
