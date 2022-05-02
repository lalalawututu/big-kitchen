import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils'
import {Cost_Server} from "../../common";

const laborUrl = Cost_Server + "/cost/labor"
const deviceUrl =  Cost_Server + "/cost/devices"
const materialUrl =  Cost_Server + "/cost/materials"

const useList = () => {
  const [data, setData] = useState([]); //基本数据
  const [laborCostData, setLaborCostData] = useState([]);
  const [materialCostData, setMaterialCostData] = useState([]);
  const [deviceCostData, setDeviceCostData] = useState([]);
  const [energyCostData, setEnergyCostData] = useState([]);
  const [grossProfitData, setGrossProfitData] = useState([]); //毛利率

  useMount(() => {
    //毛利数据
    setGrossProfitData({
      costId: 1,
      costName: '毛利率',
      todayCost: '87', //今日毛利
      todayRate: '15', //今日毛利率
      yesterdayCost: '87', //昨日毛利
      yesterdayRate: '14', //昨日毛利率
      weekCost: '660', //周毛利
      weekRate: '13', //周毛利率
      monthCost: '2564', //月毛利
      monthRate: '12', //月毛利率
    })
    var obj = [{
      costId: 1,
      costName: '物料成本',
      todayCost: '67', //今日消耗
      yesterdayCost: '51', //昨日消耗
      weekCost: '660', //周消耗
      monthCost: '2564', //月消耗
      quarterCost: '7854', //季度消耗
      Columns:'materialColumns',
    }, {
      costId: 2,
      costName: '员工成本',
      todayCost: '66', //今日消耗
      yesterdayCost: '50', //昨日消耗
      weekCost: '661', //周消耗
      monthCost: '2563', //月消耗
      quarterCost: '7853', //季度消耗
      Columns:'laborColumns',
    }, {
      costId: 3,
      costName: '设备成本',
      todayCost: '65', //今日消耗
      yesterdayCost: '53', //昨日消耗
      weekCost: '667', //周消耗
      monthCost: '2562', //月消耗
      quarterCost: '7851', //季度消耗
      Columns:'deviceColumns',
    }, {
      costId: 4,
      costName: '能源成本',
      todayCost: '69', //今日消耗
      yesterdayCost: '41', //昨日消耗
      weekCost: '660', //周消耗
      monthCost: '2554', //月消耗
      quarterCost: '7854', //季度消耗
      Columns:'energyColumns',
    }]
    setData(obj)
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
            price: item.price ? item.price : 0,
          }
          data.push(panInfo)
        })
        setLaborCostData(data)
      }
    })
    fetch(`${materialUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        console.log(planList)
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            key: index,
            sku_code: item.skuCode,
            amount: item.consumed.toFixed(2),
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
    // fetch(`${energyUrl}`).then(async (response) => {
    //   if (response.ok) {
    //     let dataJson = await response.json()
    //     let planList = dataJson.data.List
    //     let data = []
    //     planList.forEach((item, index) => {
    //       let panInfo = {
    //         key: index,
    //         energy_type: item.energy_type,
    //         amount: item.amount,
    //         price: item.price,
    //       }
    //       data.push(panInfo)
    //     })
    //     setEnergyCostData(data)
    //   }
    // })
  })
  return { data, laborCostData, materialCostData, deviceCostData, energyCostData, grossProfitData }
}

let costContainer = createContainer(useList)
export default costContainer
