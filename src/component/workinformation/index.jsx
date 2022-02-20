import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Descriptions, Table, Tabs } from 'antd';
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
                        let WorkerQuantity = 0;
                        let WorkingHours = 0;
                        item.WorkingProcedure.forEach((item, index) => {
                            WorkingHours += item.WorkingHours
                            WorkerQuantity += item.WorkerQuantity
                        })
                        this.setState({ WorkerQuantity: WorkerQuantity });
                        this.setState({ WorkingHours: WorkingHours });
                    }
                })
            }
        });
    }

    render() {
        const { workingProcedure } = this.state;
        const { Column } = Table;
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
                        {workingProcedure != null &&
                            workingProcedure.map((item, index) => (
                                <TabPane tab={`${index + 1}.${item.WorkingProcedureName}`} key={index}>
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
                                            <p>{item.Description}</p>
                                        </Col>
                                        <Col span={12} className="device">
                                            <h3 className="common-two-title">设备：</h3>
                                            <Table dataSource={item.Equipment} scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                                <Column title="设备编号" dataIndex="EquipmentId" key="EquipmentId" />
                                                <Column title="设备名称" dataIndex="EquipmentName" key="EquipmentName" />
                                                <Column title="设备类型" dataIndex="EquipmentCategory" key="EquipmentCategory" />
                                                <Column title="品牌" dataIndex="Brand" key="Brand" />
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row className="step-list-box">
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">原料</h3>
                                            <Table dataSource={item.Material} scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                                <Column title="名称" dataIndex="MaterialName" key="MaterialName" />
                                                <Column title="规格" dataIndex="Specification" key="Specification" />
                                                <Column title="单位" dataIndex="Unit" key="Unit" />
                                                <Column title="数量" dataIndex="Quantity" key="Quantity" />
                                            </Table>
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">调料</h3>
                                            <Table dataSource={item.Seasoning} scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                                <Column title="名称" dataIndex="SeasoningName" key="SeasoningName" />
                                                <Column title="规格" dataIndex="Specification" key="Specification" />
                                                <Column title="单位" dataIndex="Unit" key="Unit" />
                                                <Column title="数量" dataIndex="Quantity" key="Quantity" />
                                            </Table>
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">包材</h3>
                                            <Table dataSource={item.Packaging} scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                                <Column title="名称" dataIndex="PackagingName" key="PackagingName" />
                                                <Column title="规格" dataIndex="Specification" key="Specification" />
                                                <Column title="单位" dataIndex="Unit" key="Unit" />
                                                <Column title="数量" dataIndex="Quantity" key="Quantity" />
                                            </Table>
                                        </Col>
                                        <Col span={6} className="device">
                                            <h3 className="common-two-title">人员</h3>
                                            <Table dataSource={item.Worker} scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                                <Column title="岗位" dataIndex="WorkerPosition" key="WorkerPosition" />
                                                <Column title="部门" dataIndex="Department" key="Department" />
                                                <Column title="数量" dataIndex="Quantity" key="Quantity" />
                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>
                            ))
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

export default connect()(WorkInfo);
