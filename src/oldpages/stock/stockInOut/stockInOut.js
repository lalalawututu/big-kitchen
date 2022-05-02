import Crumbs from "./components/crumbs";
import StockInOutContainer from '../../../container/stock/stockInOut'
import TabContent from "./components/table";
import './stockInOut.less'

export default function stockList() {
    return (
        <div className="stock-list container">
            <StockInOutContainer.Provider>
                <Crumbs />
                <TabContent />
            </StockInOutContainer.Provider>
        </div>
    )
}
