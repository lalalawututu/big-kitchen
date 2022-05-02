import { useEffect } from 'react'
import { Table, Space, Button, Input, Modal, Row, Col, Form } from 'antd';
import OrganizationContainer from '../../../container/system/organization/inedx.js'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import '@/oldpages/system/index.less'
const { Search } = Input;

//列表搜索功能
function OptFun() {
    let organization = OrganizationContainer.useContainer();
    return (
        <div className='search-container'>
            <div style={{ display: 'flex' }}>
                <Search
                    placeholder="输入组织名称查询"
                    value={organization.searchInfo.DeptName || ''}
                    onChange={(evt) =>
                        organization.searchHandle(evt.target.value)
                    }
                    onSearch={() => organization.searchOpt(0)}
                    prefix={<SearchOutlined />}
                    allowClear
                    enterButton="搜索" size="middle" />
                <Button className="optButton" onClick={organization.ResetHandle}>重置</Button>
            </div>

            <Button icon={<DiffOutlined />} className="common-add-btn" onClick={organization.showModal}>新增部门</Button>
        </div >
    )
}

//新增部门弹框
function AddModal() {
    let organization = OrganizationContainer.useContainer();
    let deptDetail = organization.deptDetail;
    const [form] = Form.useForm()

    //添加部门
    const saveForm = () => {
        form.validateFields().then(values => {
            organization.onFinish(values)
        })
    }

    useEffect(() => {
        // 回显form功能
        if (organization.deptId) {
            form.setFieldsValue({
                DeptId: deptDetail.DeptId ? deptDetail.DeptId : '', //部门编码
                DeptName: deptDetail.DeptName ? deptDetail.DeptName : '', //部门名称
                HeaderName: deptDetail.HeaderName ? deptDetail.HeaderName : '',//负责人名称
                HeaderId: deptDetail.HeaderId ? deptDetail.HeaderId : '',//负责人Id
                ParentDeptId: deptDetail.ParentDeptId ? deptDetail.ParentDeptId : '',//父级组织ID
                ParentDeptName: deptDetail.ParentDeptName ? deptDetail.ParentDeptName : '',//父级组织名称
                Remark: deptDetail.Remark ? deptDetail.Remark : '', //备注
            })
        } else {
            form.setFieldsValue({
                HeaderName: deptDetail.HeaderName ? deptDetail.HeaderName : '',//负责人名称
                HeaderId: deptDetail.HeaderId ? deptDetail.HeaderId : '',//负责人Id
                ParentDeptId: deptDetail.ParentDeptId ? deptDetail.ParentDeptId : '',//父级组织ID
                ParentDeptName: deptDetail.ParentDeptName ? deptDetail.ParentDeptName : '',//父级组织名称
            })
        }

    }, [organization.deptDetail, form]);


    return (
        <Modal
            title={organization.modalTitle}
            width={700}
            centered
            visible={organization.isModalVisible}
            getContainer={false}
            className="add-mask"
            destroyOnClose={true}
            onCancel={() => organization.setIsModalVisible(false)}
            footer={null}
        >
            <div className="modal-addFrom">
                <Form
                    className='modal-form'
                    initialValues={{}}
                    onFinish={organization.onFinish}
                    preserve={false}
                    autoComplete="off"
                    form={form}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item label="部门编码：" name='DeptId'>
                                <Input className='field-input' placeholder="请输入编码" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="部门名称：" name='DeptName'>
                                <Input className='field-input' placeholder="请输入名称" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item label="父级部门：" name='ParentDeptId' hidden='true'>
                                <Input className='field-input' placeholder="请选择" />
                            </Form.Item>
                            {!deptDetail.sonFlag &&
                                <Form.Item label="父级部门：" name='ParentDeptName'>
                                    <Input onClick={organization.showModalOrganize} className='field-input' placeholder="请选择" />
                                </Form.Item>
                            }
                            {deptDetail.sonFlag && <Form.Item label="父级部门：" name='ParentDeptName'>
                                <Input bordered={false} className='field-input' />
                            </Form.Item>}
                        </Col>
                        <Col span={12}>
                            <Form.Item label="负责人" name='HeaderId' hidden='true'>
                                <Input className='field-input' placeholder="请选择" />
                            </Form.Item>
                            <Form.Item label="负责人" name='HeaderName'>
                                <Input onClick={organization.showModalPeople} className='field-input' placeholder="请选择" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="备注：" name='Remark'>
                                <Input className='field-input' style={{ 'width': '5rem' }} placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space className='buttons'>
                        <Button className='chen-button shadow' onClick={() => organization.setIsModalVisible(false)}>取消</Button>
                        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                    </Space>
                </Form>
            </div>
        </Modal >
    )
}

//添加人员弹框
function PeopleModal() {
    const organization = OrganizationContainer.useContainer();
    let peopleColumns = [
        { title: '用户名', dataIndex: 'Account', key: 'Account' },
        { title: '姓名', dataIndex: 'Name', key: 'Name' },
        { title: '所属部门', dataIndex: 'DeptName', key: 'DeptName' },
        { title: '岗位', key: 'JobsName', dataIndex: 'JobsName' },
    ]
    return (
        <Modal
            title="选择人员"
            className="add-mask"
            width='800px'
            okText="确认"
            cancelText="取消"
            getContainer={false}
            visible={organization.isModalVisiblePeople} onOk={organization.handleOkPeople} onCancel={organization.handleCancelPeople}
        >
            <div className='modal-addFrom'>
                <div className='searchArea'>
                    <Input placeholder="关键字查询" onChange={event => organization.searchPeopleInfo(event.target.value)} />
                    <Button className='optButton' onClick={organization.searchPeopleClick}>查询</Button>
                    <Button className='optButton' onClick={organization.Reverse}>反选</Button>
                </div>
                <div className='common-long-table'>
                    <Table
                        rowSelection={{
                            ...organization.rowPeopleSelection
                        }}
                        rowKey={record => record.UserId}
                        columns={peopleColumns}
                        dataSource={organization.peopleData}
                    />
                </div>
            </div>
        </Modal>
    )
}

//选择组织弹框
function OrganizationModal() {
    const organization = OrganizationContainer.useContainer();
    let Columns = [
        { title: '组织编码', dataIndex: 'DeptId', key: 'DeptId' },
        { title: '组织名称', dataIndex: 'DeptName', key: 'DeptName' },
        { title: '负责人', dataIndex: 'HeaderName', key: 'HeaderName' },
    ]
    return (
        <Modal
            title="选择组织"
            className="add-mask"
            width='800px'
            okText="确认"
            cancelText="取消"
            getContainer={false}
            visible={organization.isModalOrganize} onOk={organization.handleOkOrganize} onCancel={organization.handleCancelOrganize}
        >
            <div className='modal-addFrom'>
                <div className="searchArea">
                    <Input value={organization.searchInfo.DeptNameModal} placeholder="关键字查询" onChange={event => organization.searchHandle(event.target.value, 1)} />
                    <Button className='optButton' onClick={() => { organization.searchOpt(1) }}>查询</Button>
                    <Button className='optButton' onClick={organization.Reverse}>反选</Button>
                </div>
                <div className='common-long-table'>
                    <Table
                        pagination={{ pageSize: 5 }}
                        rowSelection={{
                            ...organization.rowSelectionOrganize
                        }}
                        rowKey={record => record.DeptId}
                        columns={Columns}
                        dataSource={organization.deptListModal}
                    />
                </div>
            </div>
        </Modal>
    )
}

//列表表格
function TableFun() {
    let organization = OrganizationContainer.useContainer();
    let data = organization.deptList || [];

    const columns = [
        { title: '序号', align: 'center', key: 'index', width: 80, render: (text, record, index) => `${index + 1}` },
        { title: '部门编码', dataIndex: 'DeptId', key: 'DeptId' },
        { title: '部门名称', dataIndex: 'DeptName', key: 'DeptName' },
        { title: '父级部门', dataIndex: 'ParentDeptName', key: 'ParentDeptName' },
        { title: '负责人', dataIndex: 'HeaderName', key: 'HeaderName' },
        {
            title: '操作', key: 'option', align: 'center', width: 240,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => organization.editDeptHandle(text)}>修改</Button>
                    <Button className="common-btn-bg" onClick={() => organization.addSonDept(text)}>添加子部门</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.DeptId}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default function index() {
    return (
        <div className='systemOrganization container '>
            <OrganizationContainer.Provider>
                <OptFun />
                <TableFun />
                <AddModal />
                <PeopleModal />
                <OrganizationModal />
            </OrganizationContainer.Provider>
        </div>
    )
}
