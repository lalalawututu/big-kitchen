import React, { useState } from 'react'
import {Form, Input, Button, Select, Space, Typography, Upload, message} from 'antd';
import BOMCreateContainer from '../../container/bom/bomCreate'
import { useNavigate } from 'react-router-dom';
import {Sync_Server} from "../../common";

const { Option } = Select;
const { Title } = Typography;
//form表单
function FormFun() {
    let navigate = useNavigate();
    let material = BOMCreateContainer.useContainer();
    const [form] = Form.useForm()
    const [imgList, setImgList] = useState([]);
    const [filename, setFilename] = useState('');
    const [bomname, setBomname] = useState('');
    const [finishedSkuCode, setFinishedSkuCode] = useState('');
    const [materials, setMaterials] = useState([]);
    const [outputPercent, setOutputPercent] = useState('');
    const [uploading, setUploading] = useState(0)


    const add_materials = (acc, sku_code, quantity) => {
        let material = { sku_code: sku_code, quantity: quantity}
        acc.push(material)
        setMaterials(acc)
    }

    //上传新增bom信息
    const saveForm = () => {
        const formData = { 'bom_id': '', 'bom_picture': filename, 'bom_name': bomname,
            'material': materials, 'finished_sku_code': finishedSkuCode, 'output_percent': outputPercent }
        fetch(Sync_Server + '/meta/bom/bom_id/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }).then(async (response) => {
            let res = await response.json();
            console.log(res)
        })
    }

    // 图片上传
    const doImgUpload = (options) => {
        const { onSuccess, onError, file, onProgress } = options;

        const formData = new FormData();
        formData.append('file', file)
        // imgList.forEach(file => {
        //     formData.append('files[]', file);
        // });
        setUploading(1)

        fetch(Sync_Server + '/meta/upload', {
            method: 'POST',
            body: formData,
        }).then(res => {
            console.log(res)
            res.json().then(val => setFilename(val.content))
        }).then(() => {
            // setImgList([])
            message.success('upload successfully.');
            onSuccess("done")
        }).catch((e) => {
            message.error('upload failed.');
            onError(e)
        }).finally(() => {
            setUploading(2)
            onProgress({ percent: 100 });
        });

    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    }

    const onChange = (imgList) => {
        console.log(imgList)
        setImgList(imgList.fileList)
    };

    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>
                {uploading === 1 ? uploading === 2 ? '上传完成' : '正在上传' : '选择图片文件'}
            </div>
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
                            showSearch
                            placeholder="请选择"
                            filterOption={(inputValue, option) => {
                                return option.key.includes(inputValue)
                            }}
                        >
                            {material.skuList.map((sku)=>
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
                        {material.skuList.map((sku)=>
                            <Option key={sku.materialName} value={sku.sku_code} >{sku.materialName}</Option>
                        )}
                    </Select>
                </Form.Item>
            </div>

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>BOM图片</Title>
                <Form>
                    <Upload
                        listType="picture-card"
                        customRequest={doImgUpload}
                        fileList={imgList}
                        beforeUpload={beforeUpload}
                        onChange={onChange}
                    >
                        {uploadButton}
                    </Upload>
                </Form>
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
