import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-配送
function Loading(props) {
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
                    <Descriptions.Item label="客户名称">{item.CustomerName || ''}</Descriptions.Item>
                    <Descriptions.Item label="客户地址">{item.CustomerAddress || ''}</Descriptions.Item>
                    <Descriptions.Item label="物流公司">{item.CompanyName || ''}</Descriptions.Item>
                    <Descriptions.Item label="配送员">{item.EmployeeName || ''}</Descriptions.Item>
                    <Descriptions.Item label="配送员ID">{item.EmployeeId || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际出货">{item.Quantity + item.Specifications}</Descriptions.Item>
                    <Descriptions.Item label="完成比例">{item.BatchNumber || ''}</Descriptions.Item>
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
                        {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Loading;