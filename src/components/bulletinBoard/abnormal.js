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
                                strokeColor={"#6C6CE5"} />
                            <h5 className="">{20 + index}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container submit-zj-container">
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">异常原因</h4>
                            {
                                item.reasons.map((reason)=><Button>{reason}</Button>)
                            }
                        </div>
                        <div className="mt unqualified-list">
                            <h4 className="common-submit-title">解决方法</h4>
                            {
                                item.actions.map((action)=><Button>{action}</Button>)
                            }
                        </div>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>确定并处理异常</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Abnormal;
