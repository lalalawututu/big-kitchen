import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, DatePicker } from 'antd';
import SupplierUpdateContainer from "../../container/supplierContract/addEdit";
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;


//form表单
function FormFun() {
    let navigate = useNavigate();
    let supplier = SupplierUpdateContainer.useContainer();
    const [form] = Form.useForm();

    // useEffect(() => {
    //     // 回显form功能
    //     if (supplier.brandDetail.BrandId) {
    //         form.setFieldsValue({
    //             'BrandId': supplier.brandDetail ? supplier.brandDetail.BrandId : '', //品牌id
    //             'BrandName': supplier.brandDetail ? supplier.brandDetail.BrandName : '', //品牌
    //             'Specifications': supplier.brandDetail ? supplier.brandDetail.Specifications : '', //规格
    //             'BrandType': supplier.brandDetail ? supplier.brandDetail.BrandType : '',//分类
    //         })
    //     }
    // }, [supplier.brandDetail, form]);

    console.log('BrandIdBrandId', supplier)

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
            supplier.onFinish(values)
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

                    <Form.Item label="合同编号" name="BrandName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item name="Specifications" label="供应商名称">
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            {
                                supplier.supplierList.map((item, index) => {
                                    return <Option value={item.supplier_id}>{item.supplier_name}</Option>
                                })
                            }

                        </Select>
                    </Form.Item>
                    
                    
                    <Form.Item label="签订日期" name="PurchaseDate">
                        <DatePicker className='field-input' format={dateFormat} />
                    </Form.Item>

                    
                    <Form.Item label="合同有效期" name="PurchaseDate">
                        <DatePicker className='field-input' format={dateFormat} />
                    </Form.Item>

                    <Form.Item label="负责人" name='BrandId'>
                        <Input className='field-input' />
                    </Form.Item>

                </Form>
            </div>
            <Space className='buttons btn'>
                <Button className='chen-button shadow' onClick={() => navigate('/supplier/contracts')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                {supplier.brandDetail.BrandId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => supplier.DelBrandById()}>删除</Button>}
            </Space>
        </div>
    );
}


export default function add() {
    return (
        <div className='supplierIndex'>
            <SupplierUpdateContainer.Provider>
                <FormFun />
            </SupplierUpdateContainer.Provider>
        </div >
    )
}
