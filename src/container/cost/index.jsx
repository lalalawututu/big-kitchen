import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils/index.ts'

const laborUrl = process.env.REACT_APP_API_LABORCOSTURL
const materialUrl = process.env.REACT_APP_API_MATERIALCOSTURL
const deviceUrl = process.env.REACT_APP_API_DEVICECOSTURL
const energyUrl = process.env.REACT_APP_API_ENERGYCOSTURL

const useList = () => {
  const [laborCostData, setLaborCostData] = useState([])
  const [materialCostData, setMaterialCostData] = useState([])
  const [deviceCostData, setDeviceCostData] = useState([])
  const [energyCostData, setEnergyCostData] = useState([])

  useMount(() => {
    fetch(`${laborUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            employee: item.employee,
            hour: item.hour,
            price: item.price,
          }
          data.push(panInfo)
        })
        setLaborCostData(data)
      }
    })
    fetch(`${materialUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            sku_code: item.sku_code,
            amount: item.amount,
            price: item.price,
          }
          data.push(panInfo)
        })
        setMaterialCostData(data)
      }
    })
    fetch(`${deviceUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            device: item.device,
            down_rate: item.down_rate,
            price: item.price,
          }
          data.push(panInfo)
        })
        setDeviceCostData(data)
      }
    })
    fetch(`${energyUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            energy_type: item.energy_type,
            amount: item.amount,
            price: item.price,
          }
          data.push(panInfo)
        })
        console.log(data)
        setEnergyCostData(data)
      }
    })
  })
  return { laborCostData, materialCostData, deviceCostData, energyCostData }
}

let costContainer = createContainer(useList)
export default costContainer