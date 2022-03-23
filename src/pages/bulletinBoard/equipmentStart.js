import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-设备启动
function EquipmentStart(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="设备编号">{item.equipmentCode || ''}</Descriptions.Item>
                    <Descriptions.Item label="维保状态">{item.maintenanceStatus || ''}</Descriptions.Item>
                    <Descriptions.Item label="上次维保">{item.lastMaintenanceTime || ''}</Descriptions.Item>
                    <Descriptions.Item label="设配品牌">{item.brand || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备名称">{item.equipmentName || ''}</Descriptions.Item>
                    <Descriptions.Item label="设备型号">{item.equipmentModel || ''}</Descriptions.Item>
                    <Descriptions.Item label="运行状态">{item.workingStatus || ''}</Descriptions.Item>
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
                    <Col span={18} style={{display:'flex','justify-content': 'center'}} className="submit-container">
                        <Button style={{margin:'0 20px'}} className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>启动完成</Button>
                        <Button style={{margin:'0 20px'}}  className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>上报维修</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default EquipmentStart;
