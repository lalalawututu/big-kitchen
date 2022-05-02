import { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, Select, DatePicker, Space, Typography } from 'antd';
import AssetContainer from '../../../container/basicData/asset/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
  let navigate = useNavigate()
  let asset = AssetContainer.useContainer();
  const [form] = Form.useForm()

  useEffect(() => {
    // 回显form功能
    if (asset.assetDetail.AssetsId) {
      form.setFieldsValue({
        'AssetsId': asset.assetDetail ? asset.assetDetail.AssetsId : '', //id
        'AssetsName': asset.assetDetail ? asset.assetDetail.AssetsName : '', //设备名称
        'WorkShopName': asset.assetDetail ? asset.assetDetail.WorkShopName : '', //存放车间
        'BrandName': asset.assetDetail ? asset.assetDetail.BrandName : '', //品牌
        'AssetsType': asset.assetDetail ? asset.assetDetail.AssetsType : '', //设备类型
        'PurchasingDate': asset.assetDetail ? moment(asset.assetDetail.PurchasingDate, dateFormat) : '', //购买日期
        'WarrantyPeriod': asset.assetDetail ? asset.assetDetail.WarrantyPeriod : '', //保修年限
        'MaintenanceCycle': asset.assetDetail ? asset.assetDetail.MaintenanceCycle : '', //保养周期
        'SupplierName': asset.assetDetail ? asset.assetDetail.SupplierName : '', //供应商
        'ProcurementStaff': asset.assetDetail ? asset.assetDetail.ProcurementStaff : '', //采购人员
        'Specification': asset.assetDetail ? asset.assetDetail.Specification : '', //设备说明书
      })
    }
  }, [asset.assetDetail, form]);

  //添加设备
  const saveForm = () => {
    form.validateFields().then(values => {
      asset.onFinish(values)
    })
  }
  const [imgList, setImgList] = useState([]);

  //预览图片功能
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  // 保存失败
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = ({ imgList: newImgList }) => {
    setImgList(newImgList);
  };


  const handleChange = (imgList) => {
    console.log(imgList, 'fileLimgListist')
  }

  return (
    <div className='work-create-information materials-create-box'>
      <div className='creator-content shadow'>
        <Title className='content-title' level={4}>设备信息</Title>
        <Form
          className='creator-form'
          layout='inline'
          initialValues={{}}
          form={form}
          autoComplete="off"
        >

          <Form.Item label="设备id" name="AssetsId" style={{ 'display': 'none' }}>
            <Input className='field-input' />
          </Form.Item>

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

          <Form.Item label="保养周期" name="MaintenanceCycle">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="供应商" name="SupplierName">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="采购人员" name="ProcurementStaff">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="设备说明书" name="Specification">
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
        <Button className='chen-button shadow' onClick={() => asset.assetDetail.AssetsId ? navigate('/AssetDetail', { state: { AssetsId: asset.assetDetail.AssetsId } }) : navigate('/AssetIndex')}>取消</Button>
        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
        { asset.assetDetail.AssetsId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => asset.DelAssetsById()}>删除</Button>}
      </Space>

    </div >
  );
}


export default function add() {
  return (
    <div className='supplierIndex'>
      <AssetContainer.Provider>
        <FormFun />
      </AssetContainer.Provider>
    </div >
  )
}
