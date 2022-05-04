import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'id': 1,
            'lossCode': '001',
            'customer': '客户1',
            'food': '菜品1',
            'number': '1',
            'lossReason': '报损原因1',
        }, {
            'id': 2,
            'lossCode': '002',
            'customer': '客户2',
            'food': '菜品2',
            'number': '2',
            'lossReason': '报损原因2',
        }, {
            'id': 3,
            'lossCode': '003',
            'customer': '客户3',
            'food': '菜品3',
            'number': '3',
            'lossReason': '报损原因3',
        }]
        setData(data)
    })

    return { data }
}

let frmLossContainer = createContainer(useList)
export default frmLossContainer