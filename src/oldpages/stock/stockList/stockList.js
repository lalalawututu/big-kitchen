import Crumbs from "./components/crumbs";
import StockListContainer from '../../../container/stock/stockList'
import TabContent from "./components/table";
import './stockList.less'

export default function stockList() {
    return (
        <div className="stock-list container">
            <StockListContainer.Provider>
                <Crumbs />
                <TabContent/>
            </StockListContainer.Provider>
        </div>
    )
}
