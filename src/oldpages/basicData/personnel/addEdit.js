import React from 'react'
import { Form, Input, Button, Tag, Space, Typography } from 'antd';
import PersonnelContainer from '@/container/basicData/personnel/addEdit'
const { CheckableTag } = Tag;
const { Title } = Typography;

//form表单
function FormFun() {
  let personnel = PersonnelContainer.useContainer();
  const [form] = Form.useForm()

  //修改工种
  const saveForm = () => {
    form.validateFields().then(values => {
      personnel.onFinish(values)
    })
  }

  return (
    <div className='work-create-information materials-create-box'>
      <div className='creator-content shadow module-form'>
        <Form
          name="basic"
          className='creator-form'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 4 }}
          initialValues={{}}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="人员名称" name="Name">
            <Input className='field-input' />
          </Form.Item>
        </Form>
      </div>
      <div className='creator-content shadow module-form '>
        <Title className='content-title' level={4}>工种</Title>
        {personnel.tagsData && personnel.tagsData.map(tag => (
          <CheckableTag
            style={{ marginBottom: '0.3rem' }}
            key={tag}
            checked={personnel.selectedTags.indexOf(tag) > -1}
            onChange={checked => personnel.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      <Space className='buttons btn'>
        <Button className='chen-button shadow'>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
      </Space>
    </div>
  );
}


export default function add() {
  return (
    <div className='supplierIndex'>
      <PersonnelContainer.Provider>
        <FormFun />
      </PersonnelContainer.Provider>
    </div >
  )
}
