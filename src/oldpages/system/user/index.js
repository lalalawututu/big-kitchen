import { Table, Space, Switch, Button, Input, Modal, Row, Col, Form } from 'antd';
import UserContainer from '../../../container/system/user/index.js'
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';
import '@/oldpages/system/index.less'
const { Search } = Input;

//搜索
function OptFun() {
    let user = UserContainer.useContainer();

    return (
        <div className='search-container'>
            <Search
                placeholder="姓名/部门"
                value={user.searchInfo || ''}
                onChange={(evt) =>
                    user.searchHandle(evt.target.value)
                }
                onSearch={user.searchOpt}
                prefix={<SearchOutlined />}
                allowClear
                enterButton="查询" size="middle" />
        </div >
    )
}

//用户管理列表
function TableFun() {
    let user = UserContainer.useContainer();
    let data = user.userInfoList || [];

    const columns = [
        { title: '工号', dataIndex: 'UserId', key: 'UserId' },
        { title: '姓名', dataIndex: 'Name', key: 'Name' },
        { title: '部门', dataIndex: 'DeptName', key: 'DeptName' },
        { title: '账号', dataIndex: 'Account', key: 'Account' },
        {
            title: '状态', dataIndex: 'Status', key: 'Status',
            render: (text, record, index) => {
                var status = record.Status === '1' ? true : false
                return <Switch checked={status} onClick={(checked) => user.onChangeStatus(checked, record.UserId, index)} />
            }
        },
        {
            title: '操作', key: 'option', align: 'center', width: 120,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => user.showModal(text)}>重置密码</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.UserId}
                columns={columns}
                dataSource={data}
            />
        </div >
    )
}

//修改密码
function ResetPwd() {
    let user = UserContainer.useContainer();
    let userDetail = user.userDetail ? JSON.parse(user.userDetail) : '';
    const [form] = Form.useForm()

    //重置密码
    const saveForm = () => {
        form.validateFields().then(values => {
            user.onFinish(values)
        })
    }
    return (
        <Modal title="重置密码"
            width={600}
            centered
            visible={user.isModalVisible}
            className="add-mask"
            onCancel={user.handleCancel}
            destroyOnClose={true}
            footer={null}>
            <div className="modal-addFrom">
                <Form
                    className='modal-form'
                    initialValues={{}}
                    autoComplete="off"
                    preserve={false}
                    form={form}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item label="姓名" ><div className='showDetail'>{userDetail.Name}</div> </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="工号" > <div className='showDetail'>{userDetail.UserId}</div> </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="用户名" ><div className='showDetail'>{userDetail.Account}</div>  </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="部门" ><div className='showDetail'>{userDetail.DeptName}</div></Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="密码" name='password'>
                                <Input.Password className='field-input' placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="重置密码" name='repassword'>
                                <Input.Password className='field-input' placeholder="请输入" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Space className='buttons'>
                        <Button className='chen-button shadow' onClick={user.handleCancel}>取消</Button>
                        <Button className='chen-button shadow primary' onClick={saveForm}>保存</Button>
                    </Space>
                </Form>
            </div>
        </Modal >
    )
}


export default function index() {
    return (
        <div className='systemUser container'>
            <UserContainer.Provider>
                <OptFun />
                <ResetPwd />
                <TableFun />
            </UserContainer.Provider>
        </div>
    )
}
