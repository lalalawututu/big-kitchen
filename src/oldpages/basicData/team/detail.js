import { Descriptions } from 'antd';
import teamDetail from '@/container/basicData/team/detail'
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// 供应商详情
function TeamDetail() {
    let navigate = useNavigate();
    let team = teamDetail.useContainer();
    
    return (
        <div className="work-information">
            <div className='common-edit-btn' onClick={() => navigate('/TeamAddEdit', { state: { TeamId: team.teamDetail.TeamId } })}><EditOutlined /></div>
            <div className="basic-info bg-fff">
                <h2 className="common-title">基本信息</h2>
                <Descriptions size={'default'} column={4} className="descriptions-basic">
                    <Descriptions.Item label="班组名称">{team.teamDetail.TeamName || ''}</Descriptions.Item>
                    <Descriptions.Item label="上班时间">{team.teamDetail.WorkStartTime || ''}</Descriptions.Item>
                    <Descriptions.Item label="下班时间">{team.teamDetail.WorkEndTime || ''}</Descriptions.Item>
                    <Descriptions.Item label="负责人">{team.teamDetail.HeaderName || ''}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    )
}

export default function detail() {
    return (
        <div className='supplierIndex'>
            <teamDetail.Provider>
                <TeamDetail />
            </teamDetail.Provider>
        </div >
    )
}
