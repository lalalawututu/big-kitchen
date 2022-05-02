import { Breadcrumb, Button,Form,Col,Space,Modal,Row,Input} from 'antd';
import { useState } from 'react'
import { DiffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Crumbs = props => {
    let navigate = useNavigate()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()
    const RouterPush = path => {
        navigate(path)
    }
    //弹框隐藏
    const handleCancel=()=>{
        setIsModalVisible(false)
    }
  
    return (
        <div className="search-container" style={{marginBottom:'0.2rem',justifyContent: 'end'}}>
            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={()=>{setIsModalVisible(true)}}>添加安全库存</Button>
            
            <Modal title='设置安全库存'
            width={600}
            centered
            visible={isModalVisible}
            getContainer={false}
            className="add-mask"
            destroyOnClose={true}
            onCancel={handleCancel}
            footer={null}>
            <div className="modal-addFrom">
                <Form
                    className='modal-form'
                    initialValues={{}}
                    preserve={false}
                    autoComplete="off"
                    form={form}
                >

                    <Row>
                        <Col span={12}>
                            <Form.Item label="商品名称" name='MenuName'>
                                <Input className='field-input' style={{ 'width': '400px' }} placeholder="请输入菜单名称" />
                            </Form.Item>
                        </Col>
                    </Row>
                   
                   
                    <Row>
                        <Col span={24}>
                            <Form.Item label="安全库存" name='Address' >
                              <div className='flex'>
                              <Input className='field-input' style={{ 'width': '200px' }} placeholder="请输入" />
                                <span style={{color:'#ADADAD'}}>&nbsp;&nbsp;&nbsp;&nbsp;吨（现有库存1.2吨）</span>
                              </div>
                            </Form.Item>
                           
                        </Col>
                    </Row>
                   
                    <Space className='buttons'>
                        <Button className='chen-button shadow' onClick={handleCancel}>删除</Button>
                        <Button className='chen-button shadow primary' onClick={handleCancel}>确定</Button>
                        <Button className='chen-button shadow' onClick={handleCancel}>取消</Button>
                    </Space>
                </Form>
            </div>
        </Modal >

            
        </div>

        
    )
}

export default Crumbs