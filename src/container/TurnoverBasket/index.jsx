import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'Time': '2022.12.12 11:23',
            'ReturnNumber': '4',
            'BadNumber': '2',
            'Operator': '张三',
        }, {
            'Time': '2022.12.12 11:23',
            'ReturnNumber': '4',
            'BadNumber': '2',
            'Operator': '王五',
        }]
        setData(data)
    })

    return { data }
}

let TurnoverBasketContainer = createContainer(useList)
export default TurnoverBasketContainer