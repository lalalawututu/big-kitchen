import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Space, Button, Table, Tabs, Form, Input, Select, Modal, InputNumber, Cascader } from 'antd';
import { CheckSquareOutlined, DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import './index.less';

const { TabPane } = Tabs;
const { Option } = Select;
const dataDevice = [];
const dataStep = [];
const dataStaff = [];
const apiUrl = process.env.REACT_APP_API_URL;

for (let i = 0; i < 10; i++) {
    dataDevice.push({
        key: i,
        number: i + 1,
        name: `土豆分拣机 ${i}`,
        type: `分拣设备 ${i}`,
        brand: `圣铭 ${i}`,
    });
    dataStep.push({
        key: i,
        name: `土豆 ${i}`,
        specs: `整筐 ${i}`,
        unit: `吨 ${i}`,
        number: 1.2,
    });
    dataStaff.push({
        key: i,
        name: `名字${i}`,
        class: `部门${i}`,
        number: 4,
    });
}

const initialPanes = [
    { title: '1.分拣土豆', content: 'Content of Tab 1', key: '1' },
    { title: '2.清洗土豆', content: 'Content of Tab 2', key: '2' },
    { title: '3.放置土豆', content: 'Content of Tab 3', key: '3' },
];
const optionsTab = [
    {
        value: '土豆父级1',
        label: '土豆父级1',
        children: [
            {
                value: '土豆子级1',
                label: '土豆子级1',
                children: [
                    {
                        value: '土豆子级2',
                        label: '土豆子级2',
                    },
                ],
            },
        ],
    },
    {
        value: '土豆父级2',
        label: '土豆父级2',
        children: [
            {
                value: '土豆子级1',
                label: '土豆子级1',
                children: [
                    {
                        value: '土豆子级2',
                        label: '土豆子级2',
                    },
                ],
            },
        ],
    },
];

function onChangeNumber(value) {
    console.log('changed', value);
}
function onChangeTab(value) {
    console.log(value);
}

class WorkCreate extends PureComponent {
    newTabIndex = 0;
    state = {
        activeKey: initialPanes[0].key,
        panes: initialPanes,
    };
    onChange = activeKey => {
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        console.log(targetKey,action)
        if(action == 'add'){ //创建
            this.setState({ isModalTab: true });
        }
        this[action](targetKey); //增加Tab
    };
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: 'New Tab', content: '', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };
    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    render() {
        const { panes, activeKey } = this.state;
        const onFinish = (values) => {
            axios.post(`${apiUrl}/SaveOrUpdateWorkmanship`, {
                WorkmanshipId: '',
                ProductionLineId: '1234',
                WorkmanshipName: values.WorkmanshipName,
                ProductionLineName: values.ProductionLineName,
                FinishedProduct: values.FinishedProduct,
                FinishedProductRatio: values.FinishedProductRatio,
                FinishedProductSpecification: values.select
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        const onFinishFailed = () => {
        };
        const handleOkTab = () => {
            this.setState({ isModalTab: false });
        };

        const showModal = () => {
            this.setState({ isModalVisible: true });
        };
        const handleOk = () => {
            this.setState({ isModalVisible: false });
        };
        const handleCancel = () => {
            this.setState({ isModalTab: false });
            this.setState({ isModalVisible: false });
        };

        return (
            <div className="work-create-information">
                <Form
                    ref={this.formRef}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="basic-info bg-fff">
                        <h2 className="common-title">基本信息</h2>
                        <Row gutter={24}>
                            <Col span={5}>
                                <Form.Item
                                    label="工艺名称"
                                    name="WorkmanshipName"
                                    rules={[{ required: true, message: '请填写工艺名称' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="对应生产线"
                                    name="ProductionLineName"
                                    rules={[{ required: true, message: '请填写对应生产线' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="产成品"
                                    name="FinishedProduct"
                                    rules={[{ required: true, message: '请填写产成品' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="产成品规格"
                                    name="select"
                                    rules={[{ required: true, message: '请选择产成品规格' }]}
                                >
                                    <Select allowClear>
                                        <Option value="G23654-1">G23654-1</Option>
                                        <Option value="G23654-2">G23654-2</Option>
                                        <Option value="G23654-3">G23654-3</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    label="出成率"
                                    name="FinishedProductRatio"
                                    rules={[{ required: true, message: '请填写出成率' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className="keep-container">
                        <Button className="common-btn-bg" icon={<CheckSquareOutlined />} htmlType="submit">保存</Button>
                    </div>
                </Form>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="process-container">
                        <h2 className="common-title">工艺流程</h2>
                        <Tabs defaultActiveKey="1" type="editable-card" onChange={this.onChange} onEdit={this.onEdit} className="tabs-list">
                            {panes.map(pane => (
                                <TabPane key={pane.key} closable={pane.closable}
                                    tab={
                                        <span>{pane.title}</span>
                                    }
                                >
                                    <Row gutter={24}>
                                        <Col span={6}>
                                            <Form.Item
                                                label="工序名称"
                                                name="username"
                                                rules={[{ required: true, message: '请填写工序名称' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="生产方式"
                                                name="username"
                                                rules={[{ required: true, message: '请填写生产方式' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label="产 出 品"
                                                name="username"
                                                rules={[{ required: true, message: '请选择产出品' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="报工方式"
                                                name="username"
                                                rules={[{ required: true, message: '请选择报工方式' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label="工序类别"
                                                name="username"
                                                rules={[{ required: true, message: '请选择工序类别' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="排工方式"
                                                name="username"
                                                rules={[{ required: true, message: '请选择排工方式' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item
                                                label="工 时"
                                                name="select"
                                                rules={[{ required: true, message: '请选择工时' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="质检标准"
                                                name="select"
                                                rules={[{ required: true, message: '请选择质检标准' }]}
                                            >
                                                <Select allowClear>
                                                    <Option value="1">Option 1</Option>
                                                    <Option value="2">Option 2</Option>
                                                    <Option value="3">Option 3</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row className="process-box">
                                        <Col span={12} className="explain">
                                            <h3 className="common-two-title">工艺说明：</h3>
                                            <Form.Item
                                                name="intro"
                                                rules={[{ required: true, message: 'Please input Intro' }]}
                                            >
                                                <Input.TextArea bordered={false} maxLength={200} autoSize={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} className="device">
                                            <h3 className="common-two-title">
                                                设备：
                                                {/*<Button icon={<PlusCircleFilled />} className="add-btn">添加设备</Button>*/}
                                            </h3>
                                            <Table columns={columnsDevice} dataSource={dataDevice} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                    </Row>

                                    <Row className="step-list-box">
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">原料</h3>
                                            <Table columns={columnsStep} dataSource={dataStep} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">调料</h3>
                                            <Table columns={columnsStep} dataSource={dataStep} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">包材</h3>
                                            <Table columns={columnsStep} dataSource={dataStep} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">
                                                人员：
                                                <Button icon={<PlusCircleFilled />} className="add-btn" onClick={showModal}>添加</Button>
                                            </h3>
                                            <Table columns={columnsStaff} dataSource={dataStaff} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                    </Row>

                                </TabPane>
                            ))}
                        </Tabs>
                    </div>

                    <div className="keep-container">
                        <Button className="common-btn-bg" icon={<CheckSquareOutlined />} htmlType="submit">保存</Button>
                    </div>
                </Form>

                {/* 添加tab弹框 */}
                <Modal title="选择"
                       width={600}
                       centered
                       visible={this.state.isModalTab}
                       okText="确定"
                       cancelText="取消"
                       className="add-mask"
                       onOk={handleOkTab} onCancel={handleCancel}>
                    <div className="cascader-tabs-box">
                        <h6>选择：</h6>
                        <Cascader options={optionsTab} onChange={onChangeTab} changeOnSelect className="cascader-list" />
                    </div>
                </Modal>

                {/* 添加人员弹框 */}
                <Modal title="添加人员"
                       width={600}
                       centered
                       visible={this.state.isModalVisible}
                       onCancel={handleCancel}
                       className="add-mask add-mask-footer">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="岗位"
                            name="username"
                            rules={[{ required: true, message: '请填写岗位' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="部门"
                            name="username"
                            rules={[{ required: true, message: '请填写部门' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="数量"
                            name="username"
                            rules={[{ required: true, message: '请填写数量' }]}
                        >
                            <InputNumber min={1} defaultValue={1} onChange={onChangeNumber} />
                        </Form.Item>

                        <div className="ant-modal-footer" style={{display: 'flex'}}>
                            <Button className="ant-btn" onClick={handleCancel}><span>取 消</span></Button>
                            <Button className="ant-btn ant-btn-primary" htmlType="submit" onClick={handleOk}><span>确 定</span></Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const columnsDevice = [
    {
        key: 0,
        align: 'center',
        title: '设备编号',
        dataIndex: 'number',
    },
    {
        key: 1,
        align: 'center',
        title: '设备名称',
        dataIndex: 'name',
    },
    {
        key: 2,
        align: 'center',
        title: '设备类型',
        dataIndex: 'type',
    },
    {
        key: 3,
        align: 'center',
        title: '品牌',
        dataIndex: 'brand',
    },
];
const columnsStep = [
    {
        align: 'center',
        title: '名称',
        dataIndex: 'name',
        // width: 150,
    },
    {
        align: 'center',
        title: '规格',
        dataIndex: 'specs',
        // width: 150,
    },
    {
        align: 'center',
        title: '单位',
        dataIndex: 'unit',
    },
    {
        align: 'center',
        title: '数量',
        dataIndex: 'number',
    },
    // {
    //     align: 'center',
    //     title: '操作',
    //     dataIndex: 'operation',
    //     render: (text, React) => (
    //         <Space size="middle">
    //             <DeleteOutlined style={{color: '#FF4B4B', cursor: 'pointer'}} />
    //         </Space>
    //     ),
    // }
];
const columnsStaff = [
    {
        align: 'center',
        title: '岗位',
        dataIndex: 'name',
        // width: 150,
    },
    {
        align: 'center',
        title: '部门',
        dataIndex: 'class',
        // width: 150,
    },
    {
        align: 'center',
        title: '数量',
        dataIndex: 'number',
    },
    {
        align: 'center',
        title: '操作',
        dataIndex: 'operation',
        render: (text, React) => (
            <Space size="middle">
                <DeleteOutlined style={{ color: '#FF4B4B', cursor: 'pointer' }} />
            </Space>
        ),
    }
];

export default WorkCreate;
