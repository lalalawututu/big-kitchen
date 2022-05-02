import { useState, useEffect } from 'react'
import { Form, Input, Button, Space, Typography } from 'antd';
import SupplierContainer from '../../../container/basicData/supplier/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;

//form表单
function FormFun() {
  let navigate = useNavigate();
  let supplier = SupplierContainer.useContainer();
  const [form] = Form.useForm();
  console.log(supplier, 888)

  useEffect(() => {
    // 回显form功能
    if (supplier.supplierDetail.SupplierId) {
      form.setFieldsValue({
        'SupplierId': supplier.supplierDetail ? supplier.supplierDetail.SupplierId : '', //供货商id
        'SupplierName': supplier.supplierDetail ? supplier.supplierDetail.SupplierName : '', //供货商名称
        'BrandName': supplier.supplierDetail ? supplier.supplierDetail.BrandName : '', //品牌
        'Address': supplier.supplierDetail ? supplier.supplierDetail.Address : '', //地址
        'Landline': supplier.supplierDetail ? supplier.supplierDetail.Landline : '', //座机
        'Fax': supplier.supplierDetail ? supplier.supplierDetail.Fax : '', //传真
        'Phone': supplier.supplierDetail ? supplier.supplierDetail.Phone : '', //手机
        'Linkman': supplier.supplierDetail ? supplier.supplierDetail.Linkman : '', //联系人
        'Email': supplier.supplierDetail ? supplier.supplierDetail.Email : '', //邮箱
      })
    }
  }, [supplier.supplierDetail, form]);

  //添加供应商
  const saveForm = () => {
    form.validateFields().then(values => {
      supplier.onFinish(values)
    })
  }

  return (
    <div className='work-create-information materials-create-box'>
      <Form
        className='creator-form'
        initialValues={{}}
        form={form}
        autoComplete="off"
      >
        <div className='creator-content' style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Form.Item label="供货商id" name='SupplierId' style={{ display: 'none' }}>
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="供应商名称" name="SupplierName">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="品牌" name="BrandName">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="地址" name="Address" >
            <Input className='field-input' />
          </Form.Item>
        </div>
        <div className='creator-content shadow module-form' >
          <Title className='content-title' level={4}>联系方式</Title>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Form.Item label="座机" name="Landline" >
              <Input className='field-input' />
            </Form.Item>

            <Form.Item label="传值" name="Fax" >
              <Input className='field-input' />
            </Form.Item>

            <Form.Item label="手机" name="Phone">
              <Input className='field-input' />
            </Form.Item>

            <Form.Item label="联系人" name="Linkman">
              <Input className='field-input' />
            </Form.Item>

            <Form.Item label="邮箱" name="Email">
              <Input className='field-input' />
            </Form.Item>
          </div>
        </div>
      </Form>

      <Space className='buttons btn'>
        <Button className='chen-button shadow' onClick={() => supplier.supplierDetail.SupplierId ? navigate('/supplierDetail', { state: { SupplierId: supplier.supplierDetail.SupplierId } }) : navigate('/SupplierIndex')}>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
        {supplier.supplierDetail.SupplierId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => supplier.DelSupplierById()}>删除</Button>}
      </Space>
    </div >
  );
}


export default function add() {
  return (
    <div className='supplierIndex'>
      <SupplierContainer.Provider>
        <FormFun />
      </SupplierContainer.Provider>
    </div >
  )
}
