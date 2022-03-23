import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-留样
function SampleRetention(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="计划时间">
                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="实际时间">
                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="留样内容要求">{item.TaskContent || ''}</Descriptions.Item>
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
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" onClick={(e) => { mine.TaskStartClick(item, index, 5) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default SampleRetention;
