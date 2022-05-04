import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {Cost_Server, APS_Server} from "../../common";

const laborUrl = Cost_Server + "/cost/labor"
const deviceUrl =  APS_Server + "/cost/devices"

const useList = () => {
  const [laborCostData, setLaborCostData] = useState([])
  const [deviceCostData, setDeviceCostData] = useState([])

  useMount(() => {
    fetch(`${laborUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        console.log(planList)
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            employee: item.employeeId,
            hour: item.hours ? item.hours : 0,
            attendance: item.absent,
            Yield: item.outputs[1],
            price: item.price ? item.price : 0,
          }
          data.push(panInfo)
        })
        setLaborCostData(data)
      }
    })
    fetch(`${deviceUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            device: item.deviceId,
            hours: item.hours,
            fault: item.fault,
          }
          data.push(panInfo)
        })
        setDeviceCostData(data)
      }
    })
  })
  return { laborCostData, deviceCostData }
}

let perfContainer = createContainer(useList)
export default perfContainer
