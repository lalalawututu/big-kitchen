import { useState } from 'react'
import AssetAddEditContainer from '../../container/assetAddEdit'
import { Form, Input, Button, Upload, Select, DatePicker, Space, Typography } from 'antd'

const { Option } = Select
const { Title } = Typography

export const AssetAddEditPage = () => {
  let asset = AssetAddEditContainer.useContainer()

  const [imgList, setImgList] = useState([])

  //预览图片功能
  const onPreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  // 保存失败
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = ({ imgList: newImgList }) => {
    setImgList(newImgList)
  }

  return (
    // container
    <div className='container'>
      <div className='creator-content shadow'>
        <Title className='content-title' level={4}>设备信息</Title>
        <Form
          className='creator-form'
          layout='inline'
          initialValues={{}}
          onFinish={asset.onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Form.Item label="设备名称" name="AssetsName" >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="所属车间" name="WorkShopName" >
            <Select
              placeholder="请选择"
              allowClear
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
            >
              <Option value="一层车间">一层车间</Option>
              <Option value="二层车间">二层车间</Option>
              <Option value="三层车间">三层车间</Option>
            </Select>
          </Form.Item>

          <Form.Item label="设备品牌" name="BrandName" >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="设备类型" name="AssetsType">
            <Select
              className='field-select'
              placeholder="请选择"
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
              allowClear
            >
              <Option value="切割">切割</Option>
              <Option value="清洗/消毒">清洗/消毒</Option>
              <Option value="放置">放置</Option>
              <Option value="热加工">热加工</Option>
              <Option value="分拣">分拣</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item label="购买时间" name="PurchasingDate">
            <DatePicker className='field-input' />
          </Form.Item>

          <Form.Item label="保修年限" name="WarrantyPeriod">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item
            label="保养周期"
            name="MaintenanceCycle"
          >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item
            label="供应商"
            name="SupplierName"
          >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item
            label="采购人员"
            name="ProcurementStaff"
          >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item
            label="设备说明书"
            name="Specification"
          >
            <Input className='field-input' />
          </Form.Item>
        </Form>

      </div>
      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>原料图片</Title>
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture-card'
          fileList={imgList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {imgList.length < 5 && '+ Upload'}
        </Upload>
      </div>

      <Space className='buttons btn'>
        <Button className='chen-button shadow'>取消</Button>
        <Button className='chen-button shadow primary'>保存</Button>
      </Space>
    </div >
  )
}
