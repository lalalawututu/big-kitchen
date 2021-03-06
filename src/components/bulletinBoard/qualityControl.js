import React from 'react'
import { Row, Col, Button, Progress, Descriptions, Input, InputNumber } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from "@ant-design/icons";

//看板-质检
function QualityControl(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.taskId}</Descriptions.Item>
                    <Descriptions.Item label="开始时间">{item.PlanStartTime}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                    <Descriptions.Item label="合格数量">{item.QualifyAmount}</Descriptions.Item>
                </Descriptions>

                <Row className="">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.status.finished ? 100 : 0}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.status.finished ? 100 : 0}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-InputNumber">
                            <h4 className="common-submit-title">不合格数量</h4>
                            <InputNumber controls={false} min={0} defaultValue={item.UnqualifiedNumber} value={item.UnqualifiedNumber} />
                            {
                                item.TaskStatus != '已完成' &&
                                <div className="icon-group">
                                    <b className="icon-subtract" onClick={item.UnqualifiedNumber > 0 ? () => mine.sbutractNumber(item, index) : null} />
                                    <b className="icon-add" onClick={() => mine.addNumber(item, index)} />
                                </div>
                            }

                        </div>
                        {
                            item.TaskStatus === '已完成' ?
                                <h4 className="common-submit-title"  style={{marginTop:'0.1rem',lineHeight: '1.5715'}}>不合格原因</h4> :
                                <div className="mt unqualified-list">
                                    <h4 className="common-submit-title">选择不合格原因</h4>
                                    {item.Requirements?.map((req, i) =>
                                        <Button className={req.select ? 'active' : ''} onClick={() => { mine.unqualifiedReason(req, i, index) }}>{req.name}</Button>
                                    )}
                                </div>
                        }

                        {
                            item.TaskStatus === '已完成' ?
                                <h4 className="common-submit-title" style={{marginTop:'0.1rem',lineHeight: '1.5715'}}>不合格</h4> :
                                <div>
                                    <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, true) }} icon={<BarsOutlined />}>合格</Button>
                                    <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, false) }} icon={<BarsOutlined />}>不合格</Button>
                                </div>
                        }

                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default QualityControl;
