import { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, Select, DatePicker, Typography, Space } from 'antd';
import AssetContainer from '../../../container/basicData/assetEquipment/addEdit'
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;
const { Title } = Typography;

//form表单
function FormFun() {
    let navigate = useNavigate();
    let asset = AssetContainer.useContainer();
    const [form] = Form.useForm()

    useEffect(() => {
        // 回显form功能
        if (asset.assetDetail.AssetsEquipmentId) {
            form.setFieldsValue({
                'AssetsEquipmentId': asset.assetDetail ? asset.assetDetail.AssetsEquipmentId : '', //id
                'AssetsEquipmentName': asset.assetDetail ? asset.assetDetail.AssetsEquipmentName : '', //设备名称
                'AssetsEquipmentType': asset.assetDetail ? asset.assetDetail.AssetsEquipmentType : '', //设备类型
                'AssetsEquipmentStatus': asset.assetDetail ? asset.assetDetail.AssetsEquipmentStatus : '', //设备状态
                'Specification': asset.assetDetail ? asset.assetDetail.Specification : '', //规格型号
                'Source': asset.assetDetail ? asset.assetDetail.Source : '', //来源
                'SupplierName': asset.assetDetail ? asset.assetDetail.SupplierName : '', //供应商
                'BrandName': asset.assetDetail ? asset.assetDetail.BrandName : '', //品牌
                'Company': asset.assetDetail ? asset.assetDetail.Company : '', //所属公司
                'Department': asset.assetDetail ? asset.assetDetail.Department : '', //使用部门
                'User': asset.assetDetail ? asset.assetDetail.User : '', //使用人
                'MaintenanceProvider': asset.assetDetail ? asset.assetDetail.MaintenanceProvider : '', //维保商
                'PurchaseDate': asset.assetDetail ? moment(asset.assetDetail.PurchaseDate, dateFormat) : '', //采购日期
                'Price': asset.assetDetail ? asset.assetDetail.Price : '', //采购单价
                'DepositRegion': asset.assetDetail ? asset.assetDetail.DepositRegion : '', //存放楼层
                'WorkShopName': asset.assetDetail ? asset.assetDetail.WorkShopName : '', //存放车间
                'DurableYears': asset.assetDetail ? asset.assetDetail.DurableYears : '', //使用年限
                'MaintenanceState': asset.assetDetail ? asset.assetDetail.MaintenanceState : '', //维保状态
                'ExpiryDate': asset.assetDetail ? moment(asset.assetDetail.ExpiryDate, dateFormat) : '', //脱保日期
            })
        }
    }, [asset.assetDetail, form]);

    //添加设备
    const saveForm = () => {
        form.validateFields().then(values => {
            asset.onFinish(values)
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


    const handleChange = (imgList) => {
        console.log(imgList, 'fileLimgListist')
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
                <Title className='content-title' level={4}>设备信息</Title>
                <Form
                    className='creator-form'
                    layout='inline'
                    initialValues={{}}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item label="设备编号" name="AssetsEquipmentId" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="设备名称" name="AssetsEquipmentName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="设备类型" name="AssetsEquipmentType">
                        <Select
                            className='field-select'
                            placeholder="请选择"
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            allowClear
                        >
                            <Option value="切割">切割</Option>
                            <Option value="清洗/消毒">清洗/消毒</Option>
                            <Option value="放置">放置</Option>
                            <Option value="热加工">热加工</Option>
                            <Option value="分拣">分拣</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="设备状态" name="AssetsEquipmentStatus">
                        <Select
                            className='field-select'
                            placeholder="请选择"
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            allowClear
                        >
                            <Option value="正常">正常</Option>
                            <Option value="维修">维修</Option>
                            <Option value="维护">维护</Option>
                            <Option value="报废">报废</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="规格型号" name="Specification" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="来源" name="Source" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="供应商" name="SupplierName" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="品牌" name="BrandName"  >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="所属公司" name="Company" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="使用部门" name="Department" >
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value="质检">质检</Option>
                            <Option value="设备">设备</Option>
                            <Option value="财务">财务</Option>
                            <Option value="财务">财务</Option>
                            <Option value="财务">财务</Option>
                            <Option value="产品">产品</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="使用人" name="User" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="维保商" name="MaintenanceProvider" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="采购日期" name="PurchaseDate">
                        {/* defaultValue={moment('2015/01/01', dateFormat)} */}
                        <DatePicker className='field-input' format={dateFormat} />
                    </Form.Item>

                    <Form.Item label="采购单价" name="Price">
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="存放楼层" name="DepositRegion" >
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value="一层">一层</Option>
                            <Option value="二层">二层</Option>
                            <Option value="三层">三层</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="存放车间" name="WorkShopName" >
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                            placeholder="请选择"
                            allowClear
                        >
                            <Option value="一层车间">一层车间</Option>
                            <Option value="二层车间">二层车间</Option>
                            <Option value="三层车间">三层车间</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="使用年限" name="DurableYears" >
                        <Input className='field-input' />
                    </Form.Item>

                    <Form.Item label="维保状态" name="MaintenanceState" >
                        <Select
                            className='field-select'
                            dropdownClassName='field-select-dropdown'
                            dropdownMatchSelectWidth={false}
                        >
                            <Option value="在保">在保</Option>
                            <Option value="脱保">脱保</Option>
                        </Select>

                    </Form.Item>

                    <Form.Item label="脱保日期" name="ExpiryDate">
                        <DatePicker className='field-input' />
                    </Form.Item>
                </Form>
            </div >
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

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>附件</Title>
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

            <div className='creator-content shadow module-form'>
                <Title className='content-title' level={4}>人员信息</Title>
            </div>

            <Space className='buttons btn'>
                <Button className='chen-button shadow' onClick={() => asset.assetDetail.AssetsEquipmentId ? navigate('/AssetEquipmentDetail', { state: { AssetsEquipmentId: asset.assetDetail.AssetsEquipmentId } }) : navigate('/AssetEquipmentIndex')}>取消</Button>
                <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                {asset.assetDetail.AssetsEquipmentId && <Button className='chen-button shadow primary' icon={<DeleteOutlined />} onClick={() => asset.DelAssetsEquipmentById()}>删除</Button>}
            </Space>
        </div >
    );
}


export default function add() {
    return (
        <div className='supplierIndex'>
            <AssetContainer.Provider>
                <FormFun />
            </AssetContainer.Provider>
        </div >
    )
}
