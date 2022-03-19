import React from 'react'
import { Row, Col, Button, Progress, Descriptions,Input,InputNumber } from 'antd'
import MineContainer from '../../container/mine'

//看板-质检
function QualityInspection(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="工单号">{item.TaskId}</Descriptions.Item>
                    <Descriptions.Item label="开始时间">{item.ActualStartTime ? item.ActualStartTime.split(' ')[1] : ''}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                    <Descriptions.Item label="批次号">
                        <Input placeholder="扫描批次号条码" value={item.BatchNumber} allowClear={false} className="batch-number" />
                    </Descriptions.Item>
                    <Descriptions.Item label="索证索票">{item.TicketInspection}</Descriptions.Item>
                    <Descriptions.Item label="索证索票附件">{item.AnnexName}</Descriptions.Item>
                    <Descriptions.Item label="检验数量">{item.InspectionQuantity}</Descriptions.Item>
                    <Descriptions.Item label="规格">{item.Unit}</Descriptions.Item>
                    <Descriptions.Item label="合格数量">{item.InspectionQuantity - item.UnqualifiedNumber}</Descriptions.Item>
                    {/* <Descriptions.Item label="不合格数量">
                                                                <InputNumber min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber}
                                                                    onChange={e => mine.UnqualifiedNumber(e, item, index)} className="unqualified-number" />
                                                            </Descriptions.Item> */}
                </Descriptions>

                <Row className="">
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
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-InputNumber">
                            <h4 className="common-submit-title">不合格数量</h4>
                            <InputNumber controls={false} min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber} value={item.UnqualifiedNumber} />
                            <div className="icon-group">
                                <b className="icon-subtract" onClick={item.UnqualifiedNumber > 0 ? () => mine.sbutractNumber(item) : null}></b>
                                <b className="icon-add" onClick={item.UnqualifiedNumber < 10 ? () => mine.addNumber(item) : null}></b>
                            </div>
                        </div>
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">选择不合格原因</h4>
                            <Button className="active">尺寸不达标</Button>
                            <Button>变质</Button>
                            <Button>新鲜度不达标</Button>
                            <Button>有泥土</Button>
                            <Button>发芽</Button>
                            <Button>发霉</Button>
                            <Button>破损</Button>
                            <Button>其他</Button>
                        </div>
                        <Button className="submit-btn" onClick={() => { mine.TaskStartClick(item, index, 7) }}><b class="icon-submit"></b>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default QualityInspection;
