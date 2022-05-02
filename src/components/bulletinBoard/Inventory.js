import React from 'react'
import { Row, Col, Button, Progress, Table, Space } from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'

//看板-盘库
function Inventory(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    const columns = [
        {
            align: 'center',
            title: '物料名称',
            dataIndex: 'Sku',
            key: 'Sku',
        },
        {
            align: 'center',
            title: '应有库存（KG）',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            align: 'center',
            title: '实际库存',
            dataIndex: 'inStockQuantity',
            key: 'inStockQuantity'
        },
    ];

    return (
        <div>
            <div className="product-info">
                <Table columns={columns} dataSource={item}/>

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
                    <Col span={18} className="submit-container">
                        <Button className="submit-btn" onClick={() => { mine.TaskSubmitClick(item, index, 4) }} icon={<BarsOutlined />}>异常上报</Button>
                        <Button className="submit-btn" icon={<BarsOutlined />}>盘库完成</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Inventory;
