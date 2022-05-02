import React from 'react'
import { Row, Col, Button, Progress, Descriptions,Input,InputNumber } from 'antd'
import MineContainer from '../../container/mine'
import {BarsOutlined} from "@ant-design/icons";

//看板-质检
function QualityInspection(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
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
                            <Progress percent={0 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                            <h5 className="">{0 + index}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        {/*<div className="mt unqualified-InputNumber">*/}
                        {/*    <h4 className="common-submit-title">不合格数量</h4>*/}
                        {/*    <InputNumber controls={false} min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber} value={item.UnqualifiedNumber} />*/}
                        {/*    <div className="icon-group">*/}
                        {/*        <b className="icon-subtract" onClick={item.UnqualifiedNumber > 0 ? () => mine.sbutractNumber(item) : null}/>*/}
                        {/*        <b className="icon-add" onClick={item.UnqualifiedNumber < 10 ? () => mine.addNumber(item) : null}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 7) }}><b class="icon-submit"/>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default QualityInspection;
