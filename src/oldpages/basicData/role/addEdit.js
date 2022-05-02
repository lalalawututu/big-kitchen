import { useEffect } from 'react'
import { Form, Input, Button, Tag, Select, Space, Typography } from 'antd';
import RoleContainer from '../../../container/basicData/role/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
const { CheckableTag } = Tag;
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
  let navigate = useNavigate();
  let role = RoleContainer.useContainer();
  const [form] = Form.useForm()

  useEffect(() => {
    // 回显form功能
    if (role.roleDetail.RoleId) {
      form.setFieldsValue({
        'RoleId': role.roleDetail ? role.roleDetail.RoleId : '', //角色id
        'FirstDeptName': role.roleDetail ? role.roleDetail.FirstDeptName : '', //所属一级部门
        'SecondDeptName': role.roleDetail ? role.roleDetail.SecondDeptName : '', //所属一级部门
      })
    }
  }, [role.roleDetail, form]);

  //添加角色
  const saveForm = () => {
    form.validateFields().then(values => {
      role.onFinish(values)
    })
  }

  return (
    <div className='work-create-information materials-create-box materials-create-box_JS'>
      <div className='creator-content shadow'>
        <Form
          className='creator-form'
          layout='inline'
          initialValues={{}}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="角色id" name='RoleId' style={{ display: 'none' }}>
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="所属一级部门" name="FirstDeptName">
            <Select
              placeholder="请选择"
              allowClear
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false} >
              <Option value="综合办公室">综合办公室</Option>
              <Option value="财务事业部">财务事业部</Option>
              <Option value="信息事业部">信息事业部</Option>
              <Option value="企业管理事业部">企业管理事业部</Option>
              <Option value="营销与安全">营销与安全</Option>
              <Option value="采购与仓储">采购与仓储</Option>
              <Option value="生产与研发">生产与研发</Option>
              <Option value="配送与客服">配送与客服</Option>
              <Option value="集团">集团</Option>
            </Select>
          </Form.Item>

          <Form.Item label="所属二级部门" name="SecondDeptName">
            <Select
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
              placeholder="请选择"
              allowClear
            >
              <Option value="综合办公室">综合办公室</Option>
              <Option value="财务事业部">财务事业部</Option>
              <Option value="信息事业部">信息事业部</Option>
              <Option value="企业管理事业部">企业管理事业部</Option>
              <Option value="营销与安全">营销与安全</Option>
              <Option value="采购与仓储">采购与仓储</Option>
              <Option value="生产与研发">生产与研发</Option>
              <Option value="配送与客服">配送与客服</Option>
              <Option value="集团">集团</Option>
            </Select>
          </Form.Item>

        </Form>
      </div>

      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>设置访问权限</Title>
        {role.tagsData && role.tagsData.map(tag => (
          <CheckableTag
            key={tag}
            checked={role.selectedTags.indexOf(tag) > -1}
            onChange={checked => role.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>

      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>基础信息维护权限</Title>
        {role.tagsData2 && role.tagsData2.map(tag => (
          <CheckableTag
            key={tag}
            checked={role.selectedTags2.indexOf(tag) > -1}
            onChange={checked => role.handleChange2(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>

      <Space className='buttons btn'>
        <Button className='chen-button shadow' onClick={() => navigate('/RoleIndex')}>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
        {role.roleDetail.RoleId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => role.DelRoleById()}>删除</Button>}
      </Space>

    </div>
  );
}


export default function add() {
  return (
    <div className='supplierIndex roleContent'>
      <RoleContainer.Provider>
        <FormFun />
      </RoleContainer.Provider>
    </div >
  )
}
