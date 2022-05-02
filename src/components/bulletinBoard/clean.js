import React from 'react'
import { Row, Col, Button, Progress, Descriptions,Input,InputNumber } from 'antd'
import MineContainer from '../../container/mine'
import {BarsOutlined} from "@ant-design/icons";

//看板-质检
function SimpleTask(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.taskId}</Descriptions.Item>
                    <Descriptions.Item label={item.TaskType + "剂用量"}>{item.Weight}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                </Descriptions>

                <Row className="">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.status.finished?100:0}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.status.finished?100:0}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskSubmitClick(item, index, 3) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SimpleTask;
