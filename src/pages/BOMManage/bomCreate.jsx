import React, { useState } from 'react'
import {Form, Input, Button, Select, Space, Typography, Upload, message} from 'antd';
import BOMCreateContainer from '../../container/bom/bomCreate'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;
//form表单
function FormFun() {
    let navigate = useNavigate();
    let metarial = BOMCreateContainer.useContainer();
    const [form] = Form.useForm()
    const [imgList, setImgList] = useState([]);

    //上传新增bom信息
    const saveForm = (imgList) => {
        fetch('meta/upload', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(imgList)
        }).then(async (response) => {
            let res = await response.json();
            console.log(res)
        })
    }


    const beforeUpload = (file) => {
        if (file.type !== 'image/png') {
            message.error(`${file.name} is not a png file`);
        }
        return false;
    }

    const onChange = (imgList) => {
        setImgList(imgList.fileList)
    };

    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    );
    
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

                    <Form.Item label="BOM名称" name="MaterialName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="产成品" name="BrandName" >
                        <Select
                            style={{ width: 500 }}
                            mode="single"
                            edit
                            placeholder="请选择"
                            filterOption={(inputValue, option) => {
                                return option.key.includes(inputValue)
                            }}
                        >
                            {metarial.skuList.map((sku)=>
                                <Option value={sku.sku_code} key={sku.materialName}>{sku.materialName}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="出成率" name="SupplierName" >
                        <Input className='field-input' />
                    </Form.Item>

                </Form>
            </div>
            <div className='creator-content shadow'>
                <Form.Item label="构成原料" name="BrandName" >
                    <Select
                        style={{ width: 500 }}
                        mode="multiple"
                        placeholder="可选择多种原料"
                        tokenSeparators={[" ", ","]}
                        defaultvalue={[]}
                        filterOption={(inputValue, option) => {
                            return option.key.includes(inputValue)
                        }}
                    >
                        {metarial.skuList.map((sku)=>
                            <Option key={sku.materialName} value={sku.sku_code} >{sku.materialName}</Option>
                        )}
                    </Select>
                </Form.Item>
            </div>

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>原料图片</Title>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType='picture-card'
                    fileList={imgList}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                >
                    {imgList.length > 5 ? null : uploadButton}
                </Upload>
            </div>
            <Space className='buttons btn'>
                <Button className='chen-button shadow' onClick={() => navigate('/bom')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
            </Space>
        </div>
    );
}


export default function create() {
    return (
        <div className='supplierIndex'>
            <BOMCreateContainer.Provider>
                <FormFun />
            </BOMCreateContainer.Provider>
        </div >
    )
}
