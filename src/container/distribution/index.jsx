import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'key':1,
            'WaybillNo':'D11234',
            'CustomerName':'市政府',
            'CarNumber':'川A36547',
            'weight':'1',
            'quantity':'32',
            'WaybillStatus':'已完成',
            'VehicleStatus':'正常'
        },{
            'key':2,
            'WaybillNo':'D11235',
            'CustomerName':'大运村',
            'CarNumber':'川A37317',
            'weight':'1.1',
            'quantity':'360',
            'WaybillStatus':'配送中',
            'VehicleStatus':'延误'
        },{
            'key':3,
            'WaybillNo':'D11236',
            'CustomerName':'市政府',
            'CarNumber':'川A36547',
            'weight':'1',
            'quantity':'24',
            'WaybillStatus':'待配送',
            'VehicleStatus':'正常'
        },{
            'key':4,
            'WaybillNo':'D11237',
            'CustomerName':'市政府',
            'CarNumber':'川A36547',
            'weight':'1',
            'quantity':'32',
            'WaybillStatus':'已完成',
            'VehicleStatus':'延误'
        }]
        setData(data)
    })

    return { data }
}

let DistributionContainer = createContainer(useList)
export default DistributionContainer