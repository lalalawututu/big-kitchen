import React from 'react'
import {Row, Col, Button, Progress, Descriptions, Table} from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-配送
function Loading(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    console.log(item)
    const columns = [
        {
            align: 'center',
            title: '物料名称',
            dataIndex: 'skuCode',
            key: 'skuCode',
        },
        {
            align: 'center',
            title: '配送地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            align: 'center',
            title: '配送数量',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            align: 'center',
            title: '计划回筐',
            dataIndex: 'returnBaskets',
            key: 'returnBaskets',
        },
    ];
    return (
        <div>
            <div className="product-info">
                <Table columns={columns} pagination={false} dataSource={item.deliveryDetail}/>
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
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskSubmitClick(item, index, 8) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Loading;
