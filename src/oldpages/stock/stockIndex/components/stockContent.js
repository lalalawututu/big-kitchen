import CollapseHeader from './collapseHeader'
import { Table, Button, Collapse } from 'antd';
import { useNavigate } from "react-router-dom";
import StockIndexContainer from '../../../../container/stock/stockIndex';
const { Panel } = Collapse;

//点击查看原料库信息更多内容
const Push = (props) => {
    const navigate = useNavigate();
    //点击跳转页面
    const goStockList = (WarehouseId) => {
        navigate("/stockList", { state: { id: WarehouseId } });
    }
    return (
        <Button className='lookInfo' onClick={() => { goStockList(props.WarehouseId) }}>查看所有原料库信息</Button>
    )
}


const Content = () => {
    let StockIndex = StockIndexContainer.useContainer();
    var data = StockIndex.data;
    return (
        <>
            {
                data && data.map((item, index) => {
                    return (
                        <div key={item.WarehouseId}>
                            <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right'>
                                <Panel header={item.Warehouse} key="1">
                                <CollapseHeader data={item} index={index} onClick={(WarehouseId, tabName) => this.getTabData(WarehouseId, tabName)} />
                                <div className='table_new'>
                                    <Table style={{ display: index === StockIndex.optKey ? 'block' : 'none' }} columns={StockIndex.tableColumns} dataSource={StockIndex.tableData} rowKey={record => record.Id} pagination={false} bordered size="small" />
                                    <div style={{ display: 'flex', justifyContent: 'center', margin: '0.2rem 0px' }}>
                                        <Push WarehouseId={item.WarehouseId} />
                                    </div>
                                </div>
                                </Panel>
                            </Collapse>
                        </div>
                    )
                })
            }

        </>

    )
}

export default function stockContent() {
    return (
        <>
            <Content />
        </>
    )
}
