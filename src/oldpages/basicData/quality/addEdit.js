import { useState } from 'react'
import { Form, Input, Button, Select, Space, Typography, Upload } from 'antd';
import qualityContainer from '../../../container/basicData/quality/addEdit'
const Option = Select;
const { Title } = Typography;

//form表单
function FormFun() {
  let quality = qualityContainer.useContainer();
  const [form] = Form.useForm()

  //添加质检标准
  const saveForm = () => {
    form.validateFields().then(values => {
      quality.onFinish(values)
    })
  }

  const [fileList, setFileList2] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ]);

  const onChange2 = ({ imgList: newImgList }) => {
    setFileList2(newImgList);
  };

  return (
    <div className='work-create-information materials-create-box'>
      <div className='creator-content shadow'>
        <Form
          className='creator-form'
          layout='inline'
          initialValues={{}}
          form={form}
          autoComplete="off"
        >
          <Form.Item label="标准序号" name="">
            <Input className='field-input' />
          </Form.Item>

          <Form.Item label="标准名称" name="StandardName" >
            <Input className='field-input' />
          </Form.Item>

          <Form.Item name="WorkingProcedureName" label="工序">
            <Select
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
              placeholder="请选择"
              allowClear>
              <Option value="分割">分割</Option>
              <Option value="热加工">热加工</Option>
              <Option value="清洗/消毒">清洗/消毒</Option>
              <Option value="放置">放置</Option>
              <Option value="仓库">仓库</Option>
              <Option value="包装">包装</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="System" label="规格">
            <Select
              className='field-select'
              dropdownClassName='field-select-dropdown'
              dropdownMatchSelectWidth={false}
              placeholder="请选择"
              allowClear>
              <Option value="分割">分割</Option>
              <Option value="热加工">热加工</Option>
              <Option value="清洗/消毒">清洗/消毒</Option>
              <Option value="放置">放置</Option>
              <Option value="仓库">仓库</Option>
              <Option value="包装">包装</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item name="NonconformityProblem" label="不合格问题">
            <div>
              <Input value={quality.unqualifiedProblem} onChange={event => quality.unqualified(event.target.value)} /> <Button onClick={quality.addHandle}>添加</Button>
              {
                quality.unqualifiedProblemList && quality.unqualifiedProblemList.map((item, index) => {
                  return (
                    <div><span key={index}> {item.name}</span></div>
                  )
                })
              }
            </div>
          </Form.Item> */}
        </Form>
      </div>

      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>不合格问题</Title>
      </div>

      <div className='creator-content shadow module-form'>
        <Title className='content-title' level={4}>标准执行文件</Title>
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          fileList={fileList}
          className='file-upload'
          onChange={onChange2}
          itemRender={(originNode, file, currFileList) => (
            <div className='file-item'>
              {file.uid + file.name}
            </div>
          )}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
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
      <qualityContainer.Provider>
        <FormFun />
      </qualityContainer.Provider>
    </div >
  )
}
