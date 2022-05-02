import React from 'react';
import { Row, Col, Descriptions, Table, Tabs, Button } from 'antd';
import { DiffOutlined } from '@ant-design/icons';
import './index.less';
import WorkInformationContainer from "../../container/workinformation";

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
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
const workInfo = (text) => {
    window.location = `/#/workcreate/?id=${text}`
    // history.push("/workinformation/?id=${text.WorkmanshipId}");
}

export const WorkInfo = () => {
    let work = WorkInformationContainer.useContainer()
    console.log(work.craft)

    const { Column } = Table;
    return (
        <div className="work-information">
            <div className="basic-info bg-fff">
                <h2 className="common-title">基本信息</h2>
                <Descriptions size={'default'} column={4} className="descriptions-basic">
                    <Descriptions.Item label="工艺名称">{work.craft.WorkmanshipName}</Descriptions.Item>
                    <Descriptions.Item label="工艺说明">{work.craft.WorkmanshipContent}</Descriptions.Item>
                    <Descriptions.Item label="产成品">{work.craft.FinishedProduct}</Descriptions.Item>
                    <Descriptions.Item label="产成品规格">{work.craft.FinishedProductSpecification}</Descriptions.Item>
                    <Descriptions.Item label="工序步骤">{work.craft.ProcedureQuantity}道工序</Descriptions.Item>
                    <Descriptions.Item label="出成率">{work.craft.Qualified_rate}</Descriptions.Item>
                    <Descriptions.Item label="总工时">{work.craft.WorkingHours}</Descriptions.Item>
                </Descriptions>
                <div className="search-container">
                    <Button onClick={() => workInfo(work.craft.WorkmanshipId)}  icon={<DiffOutlined />} className="common-add-btn">编辑</Button>
                </div>
            </div>

            <div className="process-container">
                <h2 className="common-title">工艺流程</h2>
                <Tabs defaultActiveKey="1" onChange={callback} className="tabs-list">
                    {work.craft.working_procedure &&
                        work.craft.working_procedure.map((item, index) => (
                        <TabPane tab={`${index + 1}.${item.working_procedure_name}`} key={index}>
                            <Descriptions size={'default'} column={4} className="descriptions-basic">
                                <Descriptions.Item label="工序名称">{item.working_procedure_name}</Descriptions.Item>
                                <Descriptions.Item label="产 出 品">{item.output_sku_code}</Descriptions.Item>
                                <Descriptions.Item label="工序类别">{item.working_procedure_type}</Descriptions.Item>
                                <Descriptions.Item label="工    时">{item.duration/3600}小时</Descriptions.Item>
                                <Descriptions.Item label="生产方式">{item.production_mode}</Descriptions.Item>
                                <Descriptions.Item label="报工方式">{item.work_report_method}</Descriptions.Item>
                                <Descriptions.Item label="排工方式">{item.scheduling_mode}</Descriptions.Item>
                                <Descriptions.Item label="质检标准">{item.quality_inspection_standard}</Descriptions.Item>
                                <Descriptions.Item label="工艺说明">{item.description}</Descriptions.Item>
                            </Descriptions>
                            <Row className="process-box">
                                <Col span={12} className="device">
                                    <h3 className="common-two-title">物料</h3>
                                    <Table dataSource={
                                        Object.entries(item.materials).map((key,value)=>
                                            Object({
                                                MaterialName: key,
                                                Quantity: value,
                                                Specification: 'kg',
                                                Unit: 'kg',
                                            })
                                        )
                                    } scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                        <Column ellipsis={true} title="名称" dataIndex="MaterialName" key="MaterialName" />
                                        <Column title="规格" dataIndex="Specification" key="Specification" />
                                        <Column title="单位" dataIndex="Unit" key="Unit" />
                                        <Column title="数量" dataIndex="Quantity" key="Quantity" />
                                    </Table>
                                </Col>
                                <Col span={6} className="device">
                                    <h3 className="common-two-title">人员</h3>
                                    <Table dataSource={
                                        item.worker.map((value)=>
                                            Object({
                                                WorkerPosition: value,
                                                Quantity: 1,
                                                Department: '生产部',
                                            })
                                        )
                                    } scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                        <Column title="工种" dataIndex="WorkerPosition" key="WorkerPosition" />
                                        {/*<Column title="部门" dataIndex="Department" key="Department" />*/}
                                        <Column title="工人" dataIndex="Quantity" key="Quantity" />
                                    </Table>
                                </Col>
                                <Col span={4} className="device">
                                    <h3 className="common-two-title">设备：</h3>
                                    <Table dataSource={
                                        [{
                                            EquipmentCategory: item.equipment_type,
                                            EquipmentName: '',
                                            EquipmentId: '',
                                            Brand:'',
                                        }]
                                    } scroll={{ y: 142 }} pagination={false} className="table-scroll">
                                        {/*<Column title="设备编号" dataIndex="EquipmentId" key="EquipmentId" />*/}
                                        <Column title="设备名称" dataIndex="EquipmentName" key="EquipmentName" />
                                        <Column title="设备类型" dataIndex="EquipmentCategory" key="EquipmentCategory" />
                                        {/*<Column title="品牌" dataIndex="Brand" key="Brand" />*/}
                                    </Table>
                                </Col>
                            </Row>
                        </TabPane>
                    ))
                    }
                </Tabs>
            </div>

            {/*<div className="common-long-table bg-fff">*/}
            {/*    <h2 className="common-title">工艺修改日志</h2>*/}
            {/*    <Table columns={columns} dataSource={dataSource} />*/}
            {/*</div>*/}
        </div>
    );
}

export const WorkInformation = () => {
    return (
        <WorkInformationContainer.Provider>
            <WorkInfo />
        </WorkInformationContainer.Provider>
    )
}
