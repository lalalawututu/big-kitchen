import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, Upload } from 'antd';
import BrandContainer from '@/container/basicData/brand/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
const { Option } = Select;


//form表单
function FormFun() {
    let navigate = useNavigate();
    let brand = BrandContainer.useContainer();
    const [form] = Form.useForm();

    useEffect(() => {
        // 回显form功能
        if (brand.brandDetail.BrandId) {
            form.setFieldsValue({
                'BrandId': brand.brandDetail ? brand.brandDetail.BrandId : '', //品牌id
                'BrandName': brand.brandDetail ? brand.brandDetail.BrandName : '', //品牌
                'Specifications': brand.brandDetail ? brand.brandDetail.Specifications : '', //规格
                'BrandType': brand.brandDetail ? brand.brandDetail.BrandType : '',//分类
            })
        }
    }, [brand.brandDetail, form]);

    console.log('BrandIdBrandId', brand)

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

    //添加品牌
    const saveForm = () => {
        form.validateFields().then(values => {
            brand.onFinish(values)
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
                    <Form.Item label="品牌id" name='BrandId' style={{ display: 'none' }}>
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="品牌名称" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item name="Specifications" label="规格">
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
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

                    <Form.Item name="BrandType" label="分类">
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            <Option value="原材料">原材料</Option>
                            <Option value="包材">包材</Option>
                            <Option value="耗材">耗材</Option>
                            <Option value="调料">调料</Option>
                            <Option value="两">调理包</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="LOGO" name="LogoUrl" >
                        <Upload
                            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                            listType='picture-card'
                            fileList={imgList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {imgList.length < 5 && '+ Upload'}
                        </Upload>
                    </Form.Item>
                </Form>
            </div>
            <Space className='buttons btn'>
                <Button className='chen-button shadow' onClick={() => navigate('/BrandIndex')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                {brand.brandDetail.BrandId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => brand.DelBrandById()}>删除</Button>}
            </Space>
        </div>
    );
}

export default function add() {
    return (
        <div className='supplierIndex'>
            <BrandContainer.Provider>
                <FormFun />
            </BrandContainer.Provider>
        </div >
    )
}
