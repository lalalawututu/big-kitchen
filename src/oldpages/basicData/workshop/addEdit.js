import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, Typography } from 'antd';
import WorkshopContainer from '../../../container/basicData/workshop/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
  let navigate = useNavigate();
  let workshop = WorkshopContainer.useContainer();
  const [form] = Form.useForm();

  useEffect(() => {
    // 回显form功能
    if (workshop.workshopDetail.WorkShopId) {
      form.setFieldsValue({
        'WorkShopId': workshop.workshopDetail ? workshop.workshopDetail.WorkShopId : '', //车间id
        'WorkShopName': workshop.workshopDetail ? workshop.workshopDetail.WorkShopName : '', //车间名称
        'Floor': workshop.workshopDetail ? workshop.workshopDetail.Floor : '', //所在楼层
        'Area': workshop.workshopDetail ? workshop.workshopDetail.Area : '',//面积
      })
    }
  }, [workshop.workshopDetail, form]);

  //创建车间
  const saveForm = () => {
    form.validateFields().then(values => {
      workshop.onFinish(values)
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
          <Form.Item label="车间id" name='WorkShopId' style={{ display: 'none' }}>
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="车间名称" name="WorkShopName" >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item name="Floor" label="所在楼层">
            <Select
              placeholder="请选择"
              allowClear
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
            >
              <Option value="一层">一层</Option>
              <Option value="二层">二层</Option>
              <Option value="三层">三层</Option>
            </Select>
          </Form.Item>

          <Form.Item label="车间面积" name="Area" >
            <Input className='field-input' />
          </Form.Item>
        </Form>
      </div>
      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>车间位置</Title>
      </div>
      <Space className='buttons btn'>
        <Button className='chen-button shadow' onClick={() => navigate('/WorkshopIndex')}>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
        {workshop.workshopDetail.WorkShopId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => workshop.DelWorkShopById()}>删除</Button>}
      </Space>
    </div>
  );
}


export default function add() {
  return (
    <div className='supplierIndex'>
      <WorkshopContainer.Provider>
        <FormFun />
      </WorkshopContainer.Provider>
    </div >
  )
}
