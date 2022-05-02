import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {Sync_Server} from "../../common";

const routesUrl = Sync_Server + "/data/blockchain?model=routes"

const useList = () => {
  const [routesData, setRoutesData] = useState([])

  useMount(() => {
    fetch(`${routesUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.routes.forEach((item, index) => {
          item.oroderDetail.forEach((item2)=>{
            let panInfo = {
              key: item2.skuCode,
              skuCode: item2.skuCode,
              carNo: item.driver.carNo,
              driver: item.driver.name,
              barCode: item2.barCode,
              address: item2.address,
            }
            data.push(panInfo)
          })
        })
        setRoutesData(data)
      }
    })
  })
  return { routesData }
}

let universiadeContainer = createContainer(useList)
export default universiadeContainer
