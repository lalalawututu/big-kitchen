import { useState } from 'react'
import { Form, Input, Button, Select, Space, Upload, Typography, DatePicker } from 'antd';
// import BrandContainer from '@/container/basicData/brand/addEdit'
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
    // let brand = BrandContainer.useContainer();
    const [form] = Form.useForm()

    const [fileList, setFileList2] = useState([]);
    const onChange2 = ({ imgList: newImgList }) => {
        setFileList2(newImgList);
    };

    //添加品牌
    const saveForm = () => {
        form.validateFields().then(values => {
            // brand.onFinish(values)
        })
    }

    return (
        <div className='work-create-information materials-create-box'>
            <div className='creator-content shadow module-form'>
                <Form
                    className='creator-form'
                    layout='inline'
                    initialValues={{}}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item label="设备名称" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item name="Specifications" label="所属车间">
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

                    <Form.Item name="BrandType" label="设备类型">
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            <Option value="切割">切割</Option>
                            <Option value="清洗/消毒">清洗/消毒</Option>
                            <Option value="放置">放置</Option>
                            <Option value="热加工">热加工</Option>
                            <Option value="分拣">分拣</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>设备信息</Title>
                <Form
                    className='creator-form'
                    layout='inline'
                    initialValues={{}}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item label="购买时间" name="BrandName" >
                        <DatePicker className='field-input' />
                    </Form.Item>

                    <Form.Item label="保修年限" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="保养周期" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="供应商" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="采购人员" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="设备说明书" name="BrandName" >
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
                    </Form.Item>
                </Form>

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
            {/* <BrandContainer.Provider> */}
                <FormFun />
            {/* </BrandContainer.Provider> */}
        </div >
    )
}
