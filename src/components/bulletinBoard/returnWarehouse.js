
import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-返库
function ReturnWarehouse(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际起止时间">
                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                    <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                    <Descriptions.Item label="存放仓库名称">{item.warehouseName || ''}</Descriptions.Item>
                    <Descriptions.Item label="库位编号">{item.locationNumber || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际接货重量">{item.weight || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际入库物品">{item.EmployeeName || ''}</Descriptions.Item>
                    <Descriptions.Item label="预处理">{item.EmployeeId || ''}</Descriptions.Item>
                </Descriptions>

                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                            <h5 className="">{20 + index}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>完成并打印</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default ReturnWarehouse;
