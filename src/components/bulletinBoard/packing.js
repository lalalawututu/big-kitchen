import React from 'react'
import { Row, Col, Button, Progress, Descriptions } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-装箱(包装)
function Packing(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标
    console.log(item)
    return (
        <div>
            <div className="product-info">
                <Descriptions size={'default'} column={3} className="des-box">
                    <Descriptions.Item label="产成品">{item.skuCode}</Descriptions.Item>
                    <Descriptions.Item label="数量">{item.specAmount}</Descriptions.Item>
                    <Descriptions.Item label="规格">{item.specUnit}</Descriptions.Item>
                    <Descriptions.Item label="箱码">{item.basketBarCode}</Descriptions.Item>
                    <Descriptions.Item label="盒码">{item.boxBarCode}</Descriptions.Item>
                    <Descriptions.Item label="剩余时间">{item.leftSecs}</Descriptions.Item>
                </Descriptions>

                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.rate}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.rate}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" onClick={() => {}} icon={<BarsOutlined />}>打印二维码</Button>
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 6) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Packing;
