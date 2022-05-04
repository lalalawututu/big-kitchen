import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
    const [data, setData] = useState([]); //表格数据

    useMount(() => {
        const data = [{
            'id': 1,
            'name': '李工',
            'sex': '男',
            'jobNumber': '001',
            'results': '阴性',
            'picture': '照片',
        }, {
            'id': 2,
            'name': '王工',
            'sex': '女',
            'jobNumber': '002',
            'results': '阴性',
            'picture': '照片',
        }, {
            'id': 3,
            'name': '张工',
            'sex': '女',
            'jobNumber': '003',
            'results': '阴性',
            'picture': '照片',
        }]
        setData(data)
    })

    return { data }
}

let checkContainer = createContainer(useList)
export default checkContainer