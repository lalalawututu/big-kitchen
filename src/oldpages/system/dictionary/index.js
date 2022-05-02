import React from 'react'
import { Tree, Table, Space, Switch, Button, Input, Select, Modal, Row, Col, Form } from 'antd';
import '@/oldpages/system/index.less'
import DictionaryContainer from '../../../container/system/dictionary'

const { Option } = Select;

//组织树结构
function TreeFun() {
    let user = DictionaryContainer.useContainer();
    return (
        <div className='tree'>
            <Tree
                fieldNames={{
                    title: 'Title',
                    key: 'Id',
                    children: 'Child'
                }}
                expandedKeys={user.expandedKeys}
                onSelect={user.onTreeSelect}
                treeData={user.deptTreeList}
            />
        </div>
    )
}

function OptFun() {
    let user = DictionaryContainer.useContainer();
    console.log(user,777)
    let userDetail = user.userDetail;
    //新增组织失败函数
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='searchEle'>
            <Button type="primary" className='marginRight' onClick={() => user.showModal()}> 新增</Button>
            <Button type="primary" className='marginRight'> 导入</Button>
            <Button type="primary" className='marginRight'> 编辑</Button>
            <Button type="primary" className='marginRight' onClick={user.SelectAll}> 全选</Button>
            <Button type="primary" className='marginRight' onClick={user.ReverseSelect}> 反选</Button>
            <Button type="primary" className='marginRight' onClick={() => user.deleteDelUserInfo()}>批量删除</Button>
            <Select className='marginRight' style={{ 'width': '150px' }} value={user.searchInfo.Status}
                onChange={user.searchHandleStatus}
                placeholder="按启用状态筛选"
                allowClear
            >
                <Option value="1">是</Option>
                <Option value="0">否</Option>

            </Select>
            <Input className='marginRight' value={user.searchInfo.Name} style={{ 'width': '250px' }} placeholder="输入组织名称查询" onChange={event => user.searchHandle(event.target.value)} />
            <Button type="primary" className='marginRight' onClick={user.searchOpt}> 查询</Button>
            <Button type="primary" className='marginRight' onClick={user.ResetHandle}> 重置</Button>

            <Modal title="新增组织"
                width={600}
                centered
                visible={user.isModalVisible}
                className="add-mask"
                onCancel={user.handleCancel}
                footer={null}>
                <div className="addModal_System">
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 4 }}
                        initialValues={{}}
                        onFinish={user.onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item label="字典项编码" name='UserId'>

                                    <Input value='88888888888' name='1' style={{ 'width': '180px' }} placeholder="请输入" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="字典项名称" name='UserName'>
                                    <Input style={{ 'width': '180px' }} placeholder="请输入" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item label="所属组织" name='DeptName'>
                                    <Input style={{ 'width': '180px' }} placeholder="请选择" />
                                    {/* <Switch checked={status} onChange={onChange} /> */}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="字典项说明" name='JobsName'>
                                    <Input style={{ 'width': '180px' }} placeholder="请选择" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginBottom: '0' }}>
                            <Button type="primary" htmlType="submit" className='marginRight'>  保存 </Button>
                            <Button type="primary" onClick={user.handleCancel}> 取消 </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal >
        </div >
    )
}

function TableFun() {
    let user = DictionaryContainer.useContainer();
    let data = user.userInfoList || [];

    function onChange(checked) {
        console.log(`switch to ${checked}`);
    }
    const columns = [
        { title: '序号', align: 'center', key: 'index', width: 80, render: (text, record, index) => `${index + 1}` },
        { title: '字典项编码', dataIndex: 'UserId', key: 'UserId' },
        { title: '字典项名称', dataIndex: 'UserName', key: 'UserName' },
        { title: '字典项说明', dataIndex: 'Name', key: 'Name' },
        {
            title: '是否默认', dataIndex: 'Status', key: 'Status',
            render: (text) => {
                var status = text.Status ? 'true' : 'false'
                return <Switch checked={status} onChange={onChange} />
            }
        },
        {
            title: '启用', dataIndex: 'Status', key: 'Status',
            render: (text) => {
                var status = text.Status ? 'true' : 'false'
                return <Switch checked={status} onChange={onChange} />
            }
        },
        {
            title: '操作', key: 'option', align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => user.deleteDelDept(text)}>编辑</a>
                    <a onClick={() => user.resetPsd(text)}>删除</a>
                    <a onClick={() => user.editHandle(text)}>下移</a>
                    <a onClick={() => user.deleteDelUserInfo(text)}>上移</a>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowSelection={user.rowSelection}
            rowKey={record => record.UserId}
            columns={columns}
            dataSource={data}
        />
    )
}


function Content() {
    return (
        <div className='content'>
            <OptFun />
            <TableFun />
        </div>
    )
}

export default function index() {
    return (
        <div className='system'>
            <DictionaryContainer.Provider>
                <TreeFun />
                <Content />
            </DictionaryContainer.Provider>
        </div>
    )
}
