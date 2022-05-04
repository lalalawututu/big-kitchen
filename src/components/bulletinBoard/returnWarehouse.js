import React from 'react'
import {Row, Col, Button, Progress, Table} from 'antd'
import MineContainer from '../../container/mine'
import { BarsOutlined } from '@ant-design/icons'
import Index from "../exceptionSubmitModal";

//看板-领料
function ReturnWarehouse(props) {
    let mine = MineContainer.useContainer();
    var item = props.data; //数据
    var index = props.index; //下标

    // console.log(item)
    const columns = [
        {
            align: 'center',
            title: '物料名称',
            dataIndex: 'skuCode',
            key: 'skuCode',
        },
        {
            align: 'center',
            title: '存放库房',
            dataIndex: 'warehouse',
            key: 'warehouse'
        },
        {
            align: 'center',
            title: '存放位置',
            dataIndex: 'position',
            key: 'position'
        },
        {
            align: 'center',
            title: '计划返库（KG）',
            dataIndex: 'quantityNeed',
            key: 'quantityNeed',
        },
        {
            align: 'center',
            title: '实际返库（KG）',
            dataIndex: 'quantityPicking',
            key: 'quantityPicking',
        },
    ];

    return (
        <div>
            <div className="product-info">
                <Table columns={columns} pagination={false} dataSource={item.PickDetail}/>
                <Row className="submit-top">
                    <Col span={6} className="product-progress-box">
                        <div className="product-progress">
                            <Progress percent={item.rate}
                                      showInfo={false}
                                      type="circle"
                                      trailColor={"#E7E1E2"}
                                      strokeColor={"#6C6CE5"} />
                            <h5 className="">{item.rate}%<span>实际领料</span></h5>
                        </div>
                    </Col>
                    <Col span={18} className="submit-container">
                        {<Button className="submit-btn" onClick={() => { mine.showExceptionModal() }} icon={<BarsOutlined />}>异常上报</Button>}
                        <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskSubmitClick(item, index, 3) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                    </Col>
                </Row>
            </div>
            <Index reason={item.ExceptionReasons}/>
        </div>
    )
}

export default ReturnWarehouse;
