import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'key':1,
            'Time':'20220301',
            'Receiver':'张三',
            'Product':'修改工艺名称：凉拌土豆丝',
        },{
            'key':2,
            'Time':'20220301',
            'Receiver':'张三',
            'Product':'修改工艺名称：凉拌土豆丝',
        },{
            'key':3,
            'Time':'20220301',
            'Receiver':'张三',
            'Product':'修改工艺名称：凉拌土豆丝',
        },{
            'key':4,
            'Time':'20220301',
            'Receiver':'张三',
            'Product':'修改工艺名称：凉拌土豆丝',
        }]
        setData(data)
    })

    return { data }
}

let DistributionContainer = createContainer(useList)
export default DistributionContainer