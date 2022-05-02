import { Progress, Row, Col } from 'antd';
import StockIndexContainer from '../../../../container/stock/stockIndex';

//库存风险列表
const InventoryRisk = props => {
    return (
        <div className='txt-info'>
            {
                props.list.map(item => {
                    return (
                        <p key={item.Id}>
                            <span>{item.Name}</span>
                            <span>低{item.MissingQuantity}吨</span>
                        </p>
                    )
                })
            }
        </div>
    )
}

//即将过期列表
const AboutExpire = props => {
    return (
        <div className='txt-info'>
            {
                props.list.map(item => {
                    return (
                        <p key={item.Id}>
                            <span>{item.Name}</span>
                            <span>过期{Math.abs(Number(item.ExpirationDays))}天</span>
                        </p>
                    )
                })
            }
        </div>
    )
}

//尚未返库列表
const ReturnWarehouse = props => {
    return (
        <div className='txt-info'>
            {
                props.list.map(item => {
                    return (
                        <p key={item.Id}>
                            <span>{item.Name}</span>
                            <span>低{item.StockReturnQuantity}吨</span>
                        </p>
                    )
                })
            }
        </div>
    )
}

//计算百分比
function computePercent(num, total) {
    let denominator = total === 0 ? 1 : total; //分母
    let molecular = num ? num : 0; //分子
    return (molecular * 100) / (denominator * 100) * 100
}

const CollapseHeader = props => {
    let StockIndex = StockIndexContainer.useContainer();
    return (
        <div>
            <div className="produce-container">
                <div className="produce-plan-today">
                    <Row className="row-box">
                        <Col span={6} onClick={() => StockIndex.getTabData(props.data.WarehouseId, 'WarehouseList',props.index)}>
                            <div className="survey-box">
                                <h5>入库率</h5>
                                <span className="cyan">{(props.data.ActualWarehousing * 10) / (props.data.PlanWarehousing * 10) / 0.01}<strong>%</strong></span>
                            </div>
                            <div className="progress-step">
                                <h6>实际入库：{props.data.ActualWarehousing}吨</h6>
                                <Progress percent={computePercent(props.data.ActualWarehousing, props.data.PlanWarehousing)} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0" />
                                <h6>计划入库：{props.data.PlanWarehousing}吨</h6>
                                <Progress percent={100} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0" />
                            </div>
                        </Col>

                        <Col span={6} onClick={() => StockIndex.getTabData(props.data.WarehouseId, 'Capacity',props.index)}>
                            <div className="survey-box">
                                <h5>空容率</h5>
                                <span className="cyan">{(props.data.OnHandInventory * 10) / (props.data.InventoryCapacity * 10) / 0.01}<strong>%</strong></span>
                            </div>
                            <div className="progress-step">
                                <h6>当前库存：{props.data.OnHandInventory}吨</h6>
                                <Progress percent={computePercent(props.data.OnHandInventory, props.data.InventoryCapacity)} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0" />
                                <h6>库存容量：{props.data.InventoryCapacity}</h6>
                                <Progress percent={100} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0" />
                            </div>
                        </Col>
                        <Col span={4} onClick={() => StockIndex.getTabData(props.data.WarehouseId, 'InventoryRisk',props.index)}>
                            <div className="survey-box">
                                <h5>库存风险</h5>
                                <span>{props.data.InventoryRisk.length}</span>
                            </div>
                            <InventoryRisk list={props.data.InventoryRisk} />
                        </Col>
                        <Col span={4} onClick={() => StockIndex.getTabData(props.data.WarehouseId, 'AboutExpire',props.index)}>
                            <div className="survey-box">
                                <h5>即将过期</h5>
                                <span>{props.data.AboutExpire.length}</span>
                            </div>
                            <AboutExpire list={props.data.AboutExpire} />
                        </Col>

                        <Col span={4} onClick={() => StockIndex.getTabData(props.data.WarehouseId, 'ReturnWarehouse',props.index)}>
                            <div className="survey-box">
                                <h5>尚未返库</h5>
                                <span>{props.data.ReturnWarehouse.length}</span>
                            </div>
                            <ReturnWarehouse list={props.data.ReturnWarehouse} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default CollapseHeader