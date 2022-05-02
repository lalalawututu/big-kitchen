import React from 'react'
import {Button, Descriptions, Collapse, Table, Row, Col, Progress} from 'antd'
import MineContainer from '../../container/mine'
import {BarsOutlined} from "@ant-design/icons";
const { Panel } = Collapse

const columns = [
    {
        align: 'center',
        title: '条码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        align: 'center',
        title: '是否损坏',
        dataIndex: 'isDamaged',
        key: 'isDamaged',
    },
]
//看板-回筐看板
function Basket(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    console.log(mine.taskList)
    return (
        <div>
            <div className="product-info">
                <Table columns={columns} dataSource={[]}/>
                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.status.finished?100:0}
                                      showInfo={false}
                                      type="circle"
                                      trailColor={"#E7E1E2"}
                                      strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.status.finished?100:0}%<span>工作进度</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskSubmitClick(item, index, 8) }} icon={<BarsOutlined />}>上报坏筐</Button>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskSubmitClick(item, index, 8) }} icon={<BarsOutlined />}>回筐</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Basket;
