//看板-接货
import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import {BarsOutlined} from "@ant-design/icons";

function Receiving(props) {
    var item = props.data; //数据
    var index = props.index; //下标
    let mine = MineContainer.useContainer();
console.log(item)
    return (
        <>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.taskId || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际起止时间">
                        {item.ActualStartTime + ' - ' + item.ActualEndTime}
                    </Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                    <Descriptions.Item label="批次号">{item.batchNumber || ''}</Descriptions.Item>
                    <Descriptions.Item label="实际接货重量">{item.ActualWeighing + item.Unit}</Descriptions.Item>
                    <Descriptions.Item label="完成比例">{item.rate + '%'}</Descriptions.Item>
                    <Descriptions.Item label="送货司机">{item.Driver}</Descriptions.Item>
                    <Descriptions.Item label="送货车辆">{item.RecvCarNumber}</Descriptions.Item>
                </Descriptions>

                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                                <Progress percent={item.rate}
                                          showInfo={false}
                                          type="circle"
                                          trailColor={"#E7E1E2"}
                                          strokeColor={"#6C6CE5"}/>
                                <h5 className="">{item.rate}%<span>完成率</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskSubmitClick(item, index, 1) }}><b className="icon-submit"/>{item.btn.content}</Button>
                        {
                            item.rate === 100 ? (
                                <img width="30%" height="70%" style={{position: "absolute"}}
                                     src={"http://123.57.137.181:8090/Img/smile.gif"} alt=""/>
                            ) : null
                        }
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Receiving;
