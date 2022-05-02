import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import dataJson from '../../oldpages/stock/stockIndex/data'
import tabColumns from '../../oldpages/stock/stockIndex/components/tabColumns'

const useList = () => {
    const [data, setData] = useState([]); //基本数据
    const [tableColumns, setTableColumns] = useState([]); //表格头部
    const [tableData, setTableData] = useState([]); //表格数据
    const [optKey, setOptKey] = useState(''); //要操作的key

    useMount(() => {
        setData(dataJson.WarehouseIndex); //模拟数据
    })

    //获取表格数据
    const getTabData = (WarehouseId, tabName, index) => {
        console.log(WarehouseId, tabName, index)
        if (index > -1) { setOptKey(index) }
        //有操作的id
        if (index > -1) {
            setTableColumns(tabColumns[tabName])
            setTableData(data[index][tabName])
        }
    }

    return { data, tableColumns, tableData, optKey, getTabData }
}

let stockIndexContainer = createContainer(useList)
export default stockIndexContainer
