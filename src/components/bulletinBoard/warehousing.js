import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import MineContainer from '../../container/mine'

//看板-入库
function Warehousing(props) {
    var item = props.data; //数据
    var index = props.index; //下标
    let mine = MineContainer.useContainer();

    return (
        <div className="product-info">
            <Descriptions size={'default'} column={3} className="des-box">
                <Descriptions.Item label="工单号">{item.taskId || ''}</Descriptions.Item>
                <Descriptions.Item label="实际起止时间">
                    {item.PlanStartTime + ' - ' + item.PlanEndTime}
                </Descriptions.Item>
                <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                <Descriptions.Item label="批次号">{item.batchNumber || ''}</Descriptions.Item>
                <Descriptions.Item label="实际入库重量">{item.ActualWeighing + item.Unit}</Descriptions.Item>
                <Descriptions.Item label="完成比例">{item.rate + '%'}</Descriptions.Item>
            </Descriptions>

            <Row className="">
                <Col span={6} className="product-progress-box">
                    <div className="product-progress">
                        <Progress percent={item.rate}
                            showInfo={false}
                            type="circle"
                            trailColor={"#E7E1E2"}
                            strokeColor={"#6C6CE5"} />
                        <h5 className="">{item.rate}%<span>完成率</span></h5>
                    </div>
                </Col>
                <Col span={18} className="submit-container">
                    <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                    <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskSubmitClick(item, index, 2) }} icon={<BarsOutlined />}>二维码打印</Button>
                    <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskSubmitClick(item, index, 2) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Warehousing
