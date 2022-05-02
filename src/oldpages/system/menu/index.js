import { useEffect } from 'react'
import { Table, Button, Input, Space, Modal, Form, Row, Col, Select, InputNumber } from 'antd';
import MenuContainer from '@/container/system/menu/index'
import { DiffOutlined } from '@ant-design/icons';
const { Option } = Select;

//表格
function TableFun() {
    let menu = MenuContainer.useContainer();
    const data = menu.tableData || [];
    const columns = [
        { title: '菜单名称', dataIndex: 'MenuName', key: 'MenuName', ellipsis: true, align: 'center' },
        { title: '图标', dataIndex: 'MenuLogo', key: 'MenuLogo', ellipsis: true, align: 'center' },
        { title: '菜单等级', dataIndex: 'Level', key: 'Level', ellipsis: true, align: 'center' },
        { title: '菜单地址', dataIndex: 'Address', key: 'Address', ellipsis: true, align: 'center' },
        { title: '菜单顺序', dataIndex: 'MenuOrder', key: 'MenuOrder', ellipsis: true, align: 'center' },
        { title: '菜单图标样式', dataIndex: 'LogoStyle', key: 'LogoStyle', ellipsis: true, align: 'center' },
        {
            title: '操作', key: 'option', align: 'center', width: 220,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => menu.editMenu(text)}>编辑</Button>
                    <Button className="common-btn-bg" onClick={() => menu.deleteMenu(text)}>删除</Button>
                </Space>
            ),
        },
    ]
    return (
        <>
            <div className="search-container" style={{ justifyContent: 'end', margin: '0  0 0.4rem 0' }}>
                <Button icon={<DiffOutlined />} className="common-add-btn" onClick={menu.showModal}>菜单录入</Button>
            </div>
            <div className='common-long-table'>
                <Table
                    rowKey={record => record.MenuId}
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </>
    )
}

//新增部门弹框
function MenuModal() {
    let menu = MenuContainer.useContainer();
    const data = menu.tableData || [];
    const menuDetail = menu.menuDetail;
    const [form] = Form.useForm()

    //菜单录入或者修改
    const saveForm = () => {
        form.validateFields().then(values => {
            menu.onFinish(values)
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            MenuId: menuDetail.MenuId ? menuDetail.MenuId : '', //菜单id
            MenuName: menuDetail.MenuName ? menuDetail.MenuName : '', //菜单名称
            Level: menuDetail.Level ? menuDetail.Level : '', //菜单等级
            ParentMenuId: menuDetail.ParentMenuId ? menuDetail.ParentMenuId : '',//父菜单id
            Address: menuDetail.Address ? menuDetail.Address : '',//菜单地址
            MenuLogo: menuDetail.MenuLogo ? menuDetail.MenuLogo : '',//图标
            MenuOrder: menuDetail.MenuOrder ? menuDetail.MenuOrder : '',//菜单顺序
            LogoStyle: menuDetail.LogoStyle ? menuDetail.LogoStyle : '', //图标样式
        })

    }, [menu.menuDetail, form]);

    return (
        <Modal title={menu.modalTitle}
            width={700}
            centered
            visible={menu.isModalVisible}
            getContainer={false}
            className="add-mask"
            destroyOnClose={true}
            onCancel={menu.handleCancel}
            footer={null}>
            <div className="modal-addFrom">
                <Form
                    className='modal-form'
                    initialValues={{}}
                    preserve={false}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item label="菜单id" name="MenuId" style={{ 'display': 'none' }}>
                        <Input className='field-input' />
                    </Form.Item>

                    <Row>
                        <Col span={12}>
                            <Form.Item label="菜单名称" name='MenuName'>
                                <Input className='field-input' style={{ 'width': '400px' }} placeholder="请输入菜单名称" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="菜单等级" name='Level'>
                                <Select className='field-select' style={{ 'width': '280px' }}>
                                    <Option value="一级菜单">一级菜单</Option>
                                    <Option value="下级菜单">下级菜单</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="父级菜单：" name='ParentMenuId'>
                                <Select className='field-select' style={{ 'width': '280px' }}>
                                    {data && data.map((item, index) => {
                                        return (<Option value={item.MenuId} key={item.MenuId}>{item.MenuName}</Option>)
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="菜单地址" name='Address'>
                                <Input className='field-input' style={{ 'width': '400px' }} placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="图标" name='MenuLogo'>
                                <Select className='field-select' style={{ 'width': '280px' }}>
                                    <Option value="默认">默认</Option>
                                    <Option value="图标1">图标1</Option>
                                    <Option value="图标2">图标2</Option>
                                    <Option value="图标3">图标3</Option>
                                    <Option value="图标4">图标4</Option>
                                    <Option value="图标5">图标5</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="菜单顺序" name='MenuOrder' >
                                <InputNumber className='field-input' style={{ 'width': '280px' }} placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="菜单图标样式" name='LogoStyle' >
                                <Input className='field-input' style={{ 'width': '280px' }} placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space className='buttons'>
                        <Button className='chen-button shadow' onClick={menu.handleCancel}>取消</Button>
                        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                    </Space>
                </Form>
            </div>
        </Modal >
    )
}


export default function Index() {
    return (
        <div className='supplierIndex container'>
            <MenuContainer.Provider>
                <TableFun />
                <MenuModal />
            </MenuContainer.Provider>
        </div >
    )
}
