import Head from './components/stockHead';
import Content from './components/stockContent';
import StockIndexContainer from '../../../container/stock/stockIndex';
import './stockIndex.less';

export default function stockList() {
    return (
        <div className="stock-content container">
            <StockIndexContainer.Provider>
                <Head />
                <Content />
            </StockIndexContainer.Provider>
        </div>
    )
}
