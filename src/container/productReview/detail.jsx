import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {

    })

    return { data }
}

let voucherContainer = createContainer(useList)
export default voucherContainer