import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Typography,
    Upload,
    Space,
    Button
} from 'antd'
import './index.less'

const { Title } = Typography;
const { Option } = Select;

export const MaterialsCreatePage = () => {

    const [imgList, setImgList] = useState([]);
    const onChange = ({ imgList: newImgList }) => {
        setImgList(newImgList);
    };
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
  return (
      <div className='work-create-information materials-create-box'>
          <div className='creator-content shadow'>
              <Form
                  className='creator-form'
                  layout='inline'
                  initialValues=''
              >
                  <Form.Item label='原料名称'>
                      <Input className='field-input' placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item label='规格'>
                      <Select
                          className='field-select'
                          defaultValue='lucy'
                          dropdownClassName='field-select-dropdown'
                          dropdownMatchSelectWidth={false}
                          allowClear
                      >
                          <Option value='lucy'>XXX</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item label='分类'>
                      <Select
                          className='field-select'
                          defaultValue='lucy'
                          dropdownClassName='field-select-dropdown'
                          dropdownMatchSelectWidth={false}
                          allowClear
                      >
                          <Option value='lucy'>XXX</Option>
                      </Select>
                  </Form.Item>
                  <Form.Item label='品牌'>
                      <Input className='field-input' placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item label='供货商'>
                      <Input className='field-input' placeholder='input placeholder' />
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
      </div>
  )
}
