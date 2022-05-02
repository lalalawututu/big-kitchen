import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            SafetyStockId: '1',
            Name: "西红柿",
            Warehouse: "原料库",
            InventoryCompany: "1",
            Inventory: "365",
            SafetyStock: "2",
            LastModificationTime: "2022-05-10",
            LastModifiedBy: "张三",
        }]
        setData(data)
    })

    return { data }
}

let stockSafeContainer = createContainer(useList)
export default stockSafeContainer
