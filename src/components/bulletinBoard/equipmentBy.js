import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import MineContainer from '../../container/mine'

//看板-设备保养
function EquipmentBy(props) {
    var item = props.data; //数据
    var index = props.index; //下标
    let mine = MineContainer.useContainer();

    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="维保状态">{item.maintenanceStatus || ''}</Descriptions.Item>
                    <Descriptions.Item label="上次维保">{item.lastMaintenanceTime || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备编号">{item.equipmentCode || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{item.equipmentName || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备型号">{item.equipmentModel || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备品牌">{item.brand || ''}</Descriptions.Item>
                    <Descriptions.Item label="使用年限">{item.serviceLife || ''}</Descriptions.Item>
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
                    </Col>
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">选择维护内容</h4>
                            <Button className="active">监测设备</Button>
                            <Button>加润滑液</Button>
                            <Button>清洁设备</Button>
                            <Button>加油机</Button>
                            <Button>重置系统</Button>
                            <Button>更换配件</Button>
                            <Button>更新系统</Button>
                            <Button>其他</Button>
                        </div>
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>维保完成</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default EquipmentBy;
