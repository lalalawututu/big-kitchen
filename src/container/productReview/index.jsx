import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'

const useList = () => {
  const [data, setData] = useState([]); //表格数据

  useMount(() => {
    const data = [{
      'BatchNumber': 'PC12300611231',
      'OrderNumber': 'DJH12356789',
      'supplier': '北京新发地农产品批发市场',
      'WarehousingTime': '2022/01/17 18:57',
      'customer': '客户名称',
      'Subbatch': '2',
    }, {
      'BatchNumber': 'PC12300623212',
      'OrderNumber': 'DJH12356789',
      'supplier': '寿光地利农产品物流园有限公司',
      'WarehousingTime': '2022/01/17 18:57',
      'customer': '客户名称',
      'Subbatch': '2',
    },{
      'BatchNumber': 'PC12300623212',
      'OrderNumber': 'DJH12356789',
      'supplier': '寿光地利农产品物流园有限公司',
      'WarehousingTime': '2022/01/17 18:57',
      'customer': '客户名称',
      'Subbatch': '2',
    },{
      'BatchNumber': 'PC12300623212',
      'OrderNumber': 'DJH12356789',
      'supplier': '寿光地利农产品物流园有限公司',
      'WarehousingTime': '2022/01/17 18:57',
      'customer': '客户名称',
      'Subbatch': '2',
    }]
    setData(data)
  })

  return { data }
}

let voucherContainer = createContainer(useList)
export default voucherContainer