import React from 'react'
import { Form, Input, Button, Select, Space, Typography } from 'antd';
import FrmLoss from '@/container/frmLoss';
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
  const [form] = Form.useForm()

  //保存报损
  const saveForm = () => {
    form.validateFields().then(values => {
      //   workshop.onFinish(values)
    })
  }

  return (
    <div className='work-create-information materials-create-box'>
      <div className='creator-content shadow'>
        <Form
          className='creator-form'
          layout='inline'
          initialValues={{}}
          autoComplete="off"
          form={form}
        >
          <Form.Item label="商品批号" name="WorkShopName" >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item name="Floor" label="所属仓库">
            <Select
              placeholder="请选择"
              allowClear
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
            >
              {/* <Option value="一层">一层</Option>
              <Option value="二层">二层</Option>
              <Option value="三层">三层</Option> */}
            </Select>
          </Form.Item>

          <Form.Item label="商品名称" name="Area" >
            <Input className='field-input' />
          </Form.Item>
        </Form>
      </div>
      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>报损原因</Title>
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
      <FormFun />
    </div >
  )
}
