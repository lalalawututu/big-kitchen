import { Descriptions, Tag } from 'antd';
import roleDetail from '@/container/basicData/role/detail'
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
const { CheckableTag } = Tag;

// 供应商详情
function RoleDetail() {
  let navigate = useNavigate();
  let role = roleDetail.useContainer();
  return (
    <div className="work-information">
      <div className='common-edit-btn' onClick={() => navigate('/RoleAddEdit', { state: { RoleId: role.roleDetail.RoleId } })}><EditOutlined /></div>
      <div className="basic-info bg-fff" style={{ marginBottom: '0.3rem' }}>
        <h2 className="common-title">基本信息</h2>
        <Descriptions size={'default'} column={3} className="descriptions-basic">
          <Descriptions.Item label="一级部门">{role.roleDetail.FirstDeptName || ''}</Descriptions.Item>
          <Descriptions.Item label="二级部门">{role.roleDetail.SecondDeptName || ''}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className='creator-content shadow module-form'>
        <h2 className="common-title">访问权限</h2>
        {role.roleDetail.AccessPermissions && role.roleDetail.AccessPermissions.map(tag => (
          <CheckableTag
            key={tag}
            checked={true}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    </div>
  )
}

export default function detail() {
  return (
    <div className='supplierIndex roleContent'>
      <roleDetail.Provider>
        <RoleDetail />
      </roleDetail.Provider>
    </div >
  )
}
