import StockSafeContainer from '@/container/stock/stockSafe'
import Crumbs from "./components/crumbs";
import From from "./components/from";
import TabContent from "./components/table";
import './stockSafe.less'

function TableFun() {
    let stockSafe = StockSafeContainer.useContainer();
    return <TabContent tableList={stockSafe.data} />
}

export default function stockList() {
    return (
        <div className="stock-list container">
            <StockSafeContainer.Provider>
                <Crumbs />
                <From />
                <TableFun />
            </StockSafeContainer.Provider>
        </div>
    )
}
