import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-异常看板
function Abnormal(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    
    return (
        <div>
            <div className="product-info">
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
                    <div className="mt unqualified-list">
                            <h4 className="common-submit-title">异常原因</h4>
                            <Button className="active">X光机检测未通过</Button>
                            <Button>无法读码</Button>
                            <Button>其他</Button>
                        </div>
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">解决方法</h4>
                            <Button className="active">废弃</Button>
                            <Button>重新上架</Button>
                        </div>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>确定并处理异常</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Abnormal;
