import React from 'react'
import { Row, Col, Button, Progress, Descriptions,Input,InputNumber } from 'antd'
import MineContainer from '../../container/mine'
import {BarsOutlined} from "@ant-design/icons";

//看板-质检
function QualityInspection(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    let result = 0.0;
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.taskId}</Descriptions.Item>
                    <Descriptions.Item label="开始时间">{item.ActualStartTime}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                    <Descriptions.Item label="批次号">
                        <Input placeholder="扫描批次号条码" value={item.batchNumber} allowClear={false} className="batch-number" />
                    </Descriptions.Item>
                    <Descriptions.Item label="索证索票">{item.TicketInspection}</Descriptions.Item>
                    <Descriptions.Item label="索证索票附件">{item.AnnexName}</Descriptions.Item>
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
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-InputNumber">
                            <h4 className="common-submit-title">质检指标</h4>
                            <InputNumber controls={false} min={0.0} max={1.0} defaultValue={0.0} value={mine.inspResult} />
                            <div className="icon-group">
                                <b className="icon-subtract" onClick={()=> {result -= 0.1; mine.setInspResult(result)}}/>
                                <b className="icon-add" onClick={()=> {result += 0.1; mine.setInspResult(result)}}/>
                            </div>
                        </div>
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>合格</Button>
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 7) }} icon={<BarsOutlined />}>不合格</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default QualityInspection;
