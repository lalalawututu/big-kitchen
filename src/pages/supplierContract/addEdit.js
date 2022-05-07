import { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Space, DatePicker, Typography, Upload } from 'antd';
import SupplierUpdateContainer from "../../container/supplierContract/addEdit";
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Title } = Typography;


//form表单
function FormFun() {
    let navigate = useNavigate();
    let supplier = SupplierUpdateContainer.useContainer();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    //文件修改函數
    const fileUploadChange = (file) => {
        setFileList([])
        setFileList(file.fileList);
    };

    useEffect(() => {
        // 回显form功能
        if (supplier.contractDetail.contract_code) {
            console.log(supplier.contractDetail)
            form.setFieldsValue({
                'contract_code': supplier.contractDetail ? supplier.contractDetail.contract_code : '', //合同编号
                'contract_name': supplier.contractDetail ? supplier.contractDetail.contract_name : '', //合同名称
                'supplier_id': supplier.contractDetail ? supplier.contractDetail.supplier_id : '', //供应商名称
                'sign_at': supplier.contractDetail ? moment(supplier.contractDetail.sign_at, dateFormat) : '', //签订日期
                'expired_at': supplier.contractDetail ? moment(supplier.contractDetail.expired_at, dateFormat) : '',//合同截止日
                'manager_id': supplier.contractDetail ? supplier.contractDetail.manager_id : '', //负责人
            })
            // setFileList(supplier.contractDetail.filename)
        }
    }, [supplier.contractDetail, form]);

    //添加合同
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

                    <Form.Item label="合同编号" name="contract_code" >
                        <Input className='field-input' placeholder='合同编号' />
                    </Form.Item>

                    <Form.Item label="合同名称" name="contract_name" >
                        <Input className='field-input' placeholder='合同名称' />
                    </Form.Item>

                    <Form.Item name="supplier_id" label="供应商名称">
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            {
                                supplier.supplierList && supplier.supplierList.map((item, index) => {
                                    return <Option value={item.supplier_id} key={item.supplier_id}>{item.supplier_name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item label="签订日期" name="sign_at">
                        <DatePicker className='field-input' format={dateFormat} placeholder='签订日期' />
                    </Form.Item>


                    <Form.Item label="合同截止日" name="expired_at">
                        <DatePicker className='field-input' format={dateFormat} placeholder='合同截止日' />
                    </Form.Item>

                    <Form.Item label="负责人" name='manager_id'>
                        <Select
                            placeholder="请选择"
                            allowClear
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            {
                                supplier.employeesList && supplier.employeesList.map((item, index) => {
                                    return <Option value={item.employee_id} key={item.employee_id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </div>

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>附件</Title>
                <Upload
                    customRequest={supplier.fileUpload}
                    fileList={fileList}
                    className='file-upload'
                    onChange={fileUploadChange}
                    maxCount={1}
                    itemRender={(originNode, file, currFileList) => (

                        <div className='file-item'>
                            {
                                /* {file.uid + file.name} */
                                file.name
                            }
                        </div>
                    )}
                >
                    + Upload
                </Upload>
            </div>

            <Space className='buttons btn'>
                <Button className='chen-button shadow' onClick={() => navigate('/supplier/contracts')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                {supplier.contractDetail.contract_code && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => supplier.DelContract()}>删除</Button>}
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
