import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Space, Button, Descriptions, Table, Tabs } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';

const apiUrl = process.env.REACT_APP_API_URL;
const { TabPane } = Tabs;
const dataSource = [
    {
        key: '01',
        Time: '2022/02/07',
        People: '郭郭',
        Content: '修改工艺名称：凉拌土豆丝',
    },
    {
        key: '02',
        Time: '2022/02/07',
        People: '郭郭',
        Content: '修改原料：土豆',
    },
];
const dataDevice = [];
const dataStep = [];
for (let i = 0; i < 100; i++) {
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
}
function callback(key) {
    console.log(key);
}

class WorkInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            WorkmanshipName: '',
            ProductionLineName: '',
            FinishedProduct: '',
            FinishedProductSpecification: '',
            worklength: '',
            workingProcedure: []
        }
    }

    componentDidMount() {
        fetch(`${apiUrl}/GetWorkmanshipList`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json();
                let workData = dataJson.workmanship;
                let param = window.location.search;
                let param2 = param.split('=');
                let param3 = param2[1];
                workData.forEach((item, index) => {
                    if (item.WorkmanshipId == param3) {
                        this.setState({ WorkmanshipName: item.WorkmanshipName });
                        this.setState({ ProductionLineName: item.ProductionLineName });
                        this.setState({ FinishedProduct: item.FinishedProduct });
                        this.setState({ FinishedProductSpecification: item.FinishedProductSpecification });
                        this.setState({ worklength: item.WorkingProcedure.length });
                        this.setState({ workingProcedure: item.WorkingProcedure });
                        console.log(item.WorkingProcedure)
                        let WorkerQuantity = 0;
                        let WorkingHours = 0;
                        item.WorkingProcedure.forEach((item, index) => {
                            WorkingHours += item.WorkingHours
                            WorkerQuantity += item.WorkerQuantity
                        })
                        this.setState({ WorkerQuantity: WorkerQuantity })
                        this.setState({ WorkingHours: WorkingHours })
                    }
                })
            }
        });
    }

    render() {
        return (
            <div className="work-information">
                <div className="basic-info bg-fff">
                    <h2 className="common-title">基本信息</h2>
                    <Descriptions size={'default'} column={4} className="descriptions-basic">
                        <Descriptions.Item label="工艺名称">{this.state.WorkmanshipName}</Descriptions.Item>
                        <Descriptions.Item label="对应生产线">{this.state.ProductionLineName}</Descriptions.Item>
                        <Descriptions.Item label="产成品">{this.state.FinishedProduct}</Descriptions.Item>
                        <Descriptions.Item label="产成品规格">{this.state.FinishedProductSpecification}</Descriptions.Item>
                        <Descriptions.Item label="工序步骤">{this.state.worklength}道工序</Descriptions.Item>
                        <Descriptions.Item label="工人数量">{this.state.WorkerQuantity}</Descriptions.Item>
                        <Descriptions.Item label="总工时">{this.state.WorkingHours}</Descriptions.Item>
                    </Descriptions>
                </div>

                <div className="process-container">
                    <h2 className="common-title">工艺流程</h2>
                    <Tabs defaultActiveKey="1" onChange={callback} className="tabs-list">
                        <TabPane tab="1.分拣土豆" key="1">
                            <Descriptions size={'default'} column={4} className="descriptions-basic">
                                <Descriptions.Item label="工序名称">分拣土豆</Descriptions.Item>
                                <Descriptions.Item label="产 出 品">标准土豆</Descriptions.Item>
                                <Descriptions.Item label="工序类别">分拣</Descriptions.Item>
                                <Descriptions.Item label="工    时">2小时</Descriptions.Item>
                                <Descriptions.Item label="生产方式">人工</Descriptions.Item>
                                <Descriptions.Item label="报工方式">人工人工</Descriptions.Item>
                                <Descriptions.Item label="排工方式">自动排工</Descriptions.Item>
                                <Descriptions.Item label="质检标准">ZJ10023</Descriptions.Item>
                            </Descriptions>
                            <Row className="process-box">
                                <Col span={12} className="explain">
                                    <h3 className="common-two-title">工艺说明：</h3>
                                    <p>将选好的原料送入料斗中，经过带式传送机，同时进行挑选，霉斑薯块和腐块。</p>
                                </Col>
                                <Col span={12} className="device">
                                    <h3 className="common-two-title">设备：</h3>
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
                                    <h3 className="common-two-title">人员</h3>
                                    <Table columns={columnsStep} dataSource={dataStep} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab="2.清洗土豆" key="2">
                            Content of Tab Pane 2
                        </TabPane>

                        {this.state.workingProcedure != null &&
                            this.state.workingProcedure.forEach((item,index) => {
                                <TabPane tab={item.WorkingProcedureName} key={index + 1}>
                                    <Descriptions size={'default'} column={4} className="descriptions-basic">
                                        <Descriptions.Item label="工序名称">{item.WorkingProcedureName}</Descriptions.Item>
                                        <Descriptions.Item label="产 出 品">{item.Produce}</Descriptions.Item>
                                        <Descriptions.Item label="工序类别">{item.WorkingProcedureType}</Descriptions.Item>
                                        <Descriptions.Item label="工    时">{item.WorkingHours}小时</Descriptions.Item>
                                        <Descriptions.Item label="生产方式">{item.ProductionMode}</Descriptions.Item>
                                        <Descriptions.Item label="报工方式">{item.WorkReportMethod}</Descriptions.Item>
                                        <Descriptions.Item label="排工方式">{item.SchedulingMode}</Descriptions.Item>
                                        <Descriptions.Item label="质检标准">{item.QualityInspectionStandard}</Descriptions.Item>
                                    </Descriptions>
                                    <Row className="process-box">
                                        <Col span={12} className="explain">
                                            <h3 className="common-two-title">工艺说明：</h3>
                                            <p>将选好的原料送入料斗中，经过带式传送机，同时进行挑选，霉斑薯块和腐块。</p>
                                        </Col>
                                        <Col span={12} className="device">
                                            <h3 className="common-two-title">设备：</h3>
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
                                            <h3 className="common-two-title">人员</h3>
                                            <Table columns={columnsStep} dataSource={dataStep} scroll={{ y: 142 }} pagination={false} className="table-scroll" />
                                        </Col>
                                    </Row>
                                </TabPane>
                            })
                        }
                    </Tabs>
                </div>

                <div className="common-long-table bg-fff">
                    <h2 className="common-title">工艺修改日志</h2>
                    <Table columns={columns} dataSource={dataSource} />
                </div>
            </div>
        );
    }
}

const columns = [
    {
        align: 'center',
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        // render: text => <a>{text}</a>,
    },
    {
        align: 'center',
        title: '时间',
        dataIndex: 'Time',
        key: 'Time',
    },
    {
        align: 'center',
        title: '操作人',
        dataIndex: 'People',
        key: 'People',
        responsive: ['md'],
    },
    {
        align: 'left',

        title: '修改内容',
        dataIndex: 'Content',
        key: 'Content',
        responsive: ['lg'],
    },
];
const columnsDevice = [
    {
        key: 0,
        align: 'center',
        title: '设备编号',
        dataIndex: 'number',
        // width: 150,
    },
    {
        key: 1,
        align: 'center',
        title: '设备名称',
        dataIndex: 'name',
        // width: 150,
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
];

export default connect()(WorkInfo);
