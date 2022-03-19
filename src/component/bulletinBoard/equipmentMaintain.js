import React from 'react'
import { Row, Col, Button, Progress, Descriptions,Input } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-设备维护
function EquipmentMaintain(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="生产工单">{item.frontTaskId || ''}</Descriptions.Item>
                    <Descriptions.Item label="开始时间">{item.actualStartTime || ''}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">5小时</Descriptions.Item>
                    <Descriptions.Item label="设备编号">{item.equipmentCode || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{item.equipmentName || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备型号">{item.equipmentModel || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备品牌">{item.brand || ''}</Descriptions.Item>
                    <Descriptions.Item label="使用年限">{item.serviceLife || ''}</Descriptions.Item>
                    <Descriptions.Item label="故障类型">{item.faultType || ''}</Descriptions.Item>
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
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt Cause">
                            <h4 className="common-submit-title">故障原因</h4>
                            <Input controls={false} min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber} value={item.UnqualifiedNumber} />
                            <Button className="submit-btn" >输入</Button>
                        </div>
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">维修内容</h4>
                            <Button className="active">换新</Button>
                            <Button>更换配件</Button>
                            <Button>软件维修</Button>
                            <Button>硬件维修</Button>
                            <Button>其他</Button>
                        </div>
                        <Row>
                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>确认修好</Button>
                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>没修好</Button>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default EquipmentMaintain;
