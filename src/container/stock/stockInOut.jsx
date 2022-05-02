import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {WMS_Server} from "../../common";

const useList = () => {
    const [data, setData] = useState([]); //表格数据
    const [searchStock, setSearchStock] = useState('all')
    const [stockInfo, setStockInfo] = useState([
        {id:'all', title:'全部'},
        {id:'raw', title:'原料库'},
        {id:'seasoning', title:'调料库'},
        {id:'asset', title:'资产库'},
        {id:'packing', title:'包材库'},
        {id:'halfprod', title:'半成品库'},
        {id:'consume', title:'耗材库'},
        {id:'basket', title:'周转筐库'},
        // {id:'production', title:'成品库'},
        // {id:'sample', title:'留样库'},
    ]); //表格数据

    useMount(() => {
        const data = []
        const apiWmsInoutUrl = WMS_Server + "/wms/inout/" + searchStock
        console.log(apiWmsInoutUrl)
        fetch(`${apiWmsInoutUrl}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)
                console.log(planList)

                Object.values(planList).map((item2, index)=>{
                    stockInfo.filter(value=>value.id===item2.stockName).map(item3=>{
                        item2.stockName = item3.title
                    })
                    item2.key = item2.skuCode + index
                    item2.StockInOut = item2.quantity > 0 ? '入库' : '出库'
                    data.push(item2)
                })
                console.log(data)
                setData(data)
            }
        })
    })

    return { data, stockInfo }
}

let stockInOutContainer = createContainer(useList)
export default stockInOutContainer
