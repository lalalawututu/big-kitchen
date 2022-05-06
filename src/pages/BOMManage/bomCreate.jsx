import React, { useState } from 'react'
import {Form, Input, Button, Select, Space, Typography, Upload, message, Tag} from 'antd';
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
    const [bomname, setBomname] = useState(''); //BOM名称
    const [finishedSkuCode, setFinishedSkuCode] = useState(''); //产成品
    const [materials, setMaterials] = useState(''); // 材料
    const [materialsName, setMaterialsName] = useState(''); // 材料
    const [materialsNumber, setMaterialsNumber] = useState(''); // 材料数量
    const [materialsList, setMaterialsList] = useState(''); // 材料列表
    const [outputPercent, setOutputPercent] = useState(''); //出成率
    const [uploading, setUploading] = useState(0)
    const [materialsPostArr, setPostArr] = useState([]);

    //上传新增bom信息
    const saveForm = () => {
        const formData = { 'bom_id': '', 'bom_picture': filename, 'bom_name': bomname,
            'material': materialsPostArr, 'finished_sku_code': finishedSkuCode, 'output_percent': outputPercent }
        fetch(Sync_Server + '/meta/bom/bom_id/create', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(formData)
        }).then(async (response) => {
            let res = await response.json();
            navigate('/bom')
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

    const addMaterialList = () => {
        let material = { sku_code: materialsName, quantity: materialsNumber};
        setPostArr([...materialsPostArr, material]);
    };

    const modifyMaterialList = (item,i) => {
        materialsPostArr.forEach(t => {
            if(t.sku_code === item.sku_code && t.quantity === item.quantity) {
                let arr1 = materialsPostArr.filter((item,index) => {
                    return index !== i
                });
                console.log(arr1)
                setPostArr(arr1);
            };
        });
    };

    const clickTag = (item, i) => {
        console.log(item, i);
        console.log(materialsPostArr);
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
                        <Input className='field-input' onChange={(e) => setBomname(e.target.value)}/>
                    </Form.Item>

                    <Form.Item label="产成品" name="BrandName" >
                        <Select
                            style={{ width: 500 }}
                            showSearch
                            placeholder="请选择"
                            filterOption={(inputValue, option) => {
                                return option.key.includes(inputValue)
                            }}
                            onChange={(val) => setFinishedSkuCode(val)}
                        >
                            {material.skuList.map((sku)=>
                                <Option value={sku.sku_code} key={sku.materialName}>{sku.materialName}</Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item label="出成率" name="SupplierName" >
                        <Input className='field-input' onChange={(e) => setOutputPercent(e.target.value)}/>
                    </Form.Item>

                </Form>
            </div>
            <div className='creator-content shadow'>
                <div className="tags-type-box" style={{'marginBottom': '.3rem'}}>
                    {
                        materialsPostArr.map((item, i) =>
                            <Tag closable onClick={() => clickTag(item,i)} onClose={() => modifyMaterialList(item,i)} key={item.sku_code}>{item.sku_code} {item.quantity}</Tag>)
                    }
                </div>
                <Form.Item label="构成原料" name="BrandName" >
                    <Select
                        style={{ width: 500 }}
                        showSearch
                        placeholder="请选择原料"
                        filterOption={(inputValue, option) => {
                            return option.key.includes(inputValue)
                        }}
                        onChange={(val) => setMaterialsName(val)}
                    >
                        {material.skuList.map((sku)=>
                            <Option key={sku.materialName} value={sku.materialName} >{sku.materialName}</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="原料数量" name="number" >
                    <Input className='field-input'  onChange={(e) => setMaterialsNumber(e.target.value)}/>
                </Form.Item>
                <Space className='buttons btn' style={{'margin': 0}}>
                    <Button className='chen-button shadow primary' onClick={addMaterialList}>添加</Button>
                </Space>
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
