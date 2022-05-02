import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, Typography, Upload } from 'antd';
import MaterialContainer from '../../container/basicData/material/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
    let navigate = useNavigate();
    let metarial = MaterialContainer.useContainer();
    const [form] = Form.useForm()

    useEffect(() => {
        // 回显form功能
        if (metarial.materialDetail.MaterialId) {
            form.setFieldsValue({
                'MaterialId': metarial.materialDetail ? metarial.materialDetail.MaterialId : '', //物料id
                'MaterialName': metarial.materialDetail ? metarial.materialDetail.MaterialName : '', //物料名称
                'Specification': metarial.materialDetail ? metarial.materialDetail.Specification : '', //规格
                'MaterialType': metarial.materialDetail ? metarial.materialDetail.MaterialType : '', //分类
                'BrandName': metarial.materialDetail ? metarial.materialDetail.BrandName : '', //品牌
                'SupplierName': metarial.materialDetail ? metarial.materialDetail.SupplierName : '', //供应商
            })
        }
    }, [metarial.materialDetail, form]);

    //新增物料
    const saveForm = () => {
        form.validateFields().then(values => {
            metarial.onFinish(values)
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

    const onChange = ({ imgList: newImgList }) => {
        setImgList(newImgList);
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
                    <Form.Item label="物料id" name='MaterialId' style={{ display: 'none' }}>
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="原料名称" name="MaterialName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item name="Specification" label="规格">
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value="箱">箱</Option>
                            <Option value="筐">筐</Option>
                            <Option value="克">克</Option>
                            <Option value="公斤">公斤</Option>
                            <Option value="吨">吨</Option>
                            <Option value="两">两</Option>
                            <Option value="桶">桶</Option>
                            <Option value="袋">袋</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="MaterialType" label="分类">
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value="产成品">产成品</Option>
                            <Option value="原料">原料</Option>
                            <Option value="调料">调料</Option>
                            <Option value="调料包">调料包</Option>
                            <Option value="包材">包材</Option>
                            <Option value="耗材">耗材</Option>
                            <Option value="备件/配件">备件/配件</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="品牌" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="供应商" name="SupplierName" >
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
                <Button className='chen-button shadow' onClick={() => metarial.materialDetail.MaterialId ? navigate('/MaterialDetail', { state: { MaterialId: metarial.materialDetail.MaterialId } }) : navigate('/MaterialIndex')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                {metarial.materialDetail.MaterialId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => metarial.DelMaterialById()}>删除</Button>}
            </Space>
        </div>
    );
}


export default function add() {
    return (
        <div className='supplierIndex'>
            <MaterialContainer.Provider>
                <FormFun />
            </MaterialContainer.Provider>
        </div >
    )
}
