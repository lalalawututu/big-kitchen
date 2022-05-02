import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-生产
function Product(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.taskId}</Descriptions.Item>
                    <Descriptions.Item label="实际起止时间">
                        {item.ActualStartTime + ' - ' + item.ActualEndTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                    <Descriptions.Item label="批次号">{item.batchNumber}</Descriptions.Item>
                    <Descriptions.Item label="产成品">{item.Production}</Descriptions.Item>
                    <Descriptions.Item label="执行人">{item.employee.employee_id}</Descriptions.Item>
                    <Descriptions.Item label="实际完成">{item.ActualWeighing + item.Unit}</Descriptions.Item>
                    <Descriptions.Item label="完成比例">{item.prodrate}%</Descriptions.Item>
                </Descriptions>

                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.prodrate}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.prodrate}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        {<Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>}
                        {<Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>{item.btn.content}</Button>}
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Product
