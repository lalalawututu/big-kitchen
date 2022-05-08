import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils';
import {WMS_Server} from "../../common";

const useList = () => {
    const [data, setData] = useState([]); //表格数据
    const [searchStock, setSearchStock] = useState('all')
    const [filterArr, setFilterArr] = useState([]); //筛选数组
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
        const apiWmsInstockUrl = WMS_Server + "/wms/instock/" + searchStock
        fetch(`${apiWmsInstockUrl}`).then(async (response) => {
            if (response.ok) {
                let dataJson = await response.json()
                // console.log(dataJson.content)
                let planList = JSON.parse(dataJson.content)

                Object.values(planList).map((item)=>{
                    item.map((item2) => {
                        stockInfo.filter(value=>value.id===item2.stockName).map(item3=>{
                            item2.stockName = item3.title
                        })
                        item2.key = item2.skuCode
                        data.push(item2)
                    })
                })
                console.log(data)
                setData(data)
            }
        })
    })

    return { data, stockInfo, filterArr, setFilterArr }
}

let stockListContainer = createContainer(useList)
export default stockListContainer
