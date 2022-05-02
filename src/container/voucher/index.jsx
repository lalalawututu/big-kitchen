import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'VoucherNo': '20020212123',
            'Subject': '采购',
            'Toloan': '借方',
            'Money': '23,543.32',
            'VoucherDate': '2022年5月23日',
            'Matter': '原料采购：西红柿',
        }, {
            'VoucherNo': '20020212123',
            'Subject': '劳务费',
            'Toloan': '贷方',
            'Money': '23,543.32',
            'VoucherDate': '2022年5月23日',
            'Matter': '支付车间加班费',
        }]
        setData(data)
    })

    return { data }
}

let voucherContainer = createContainer(useList)
export default voucherContainer