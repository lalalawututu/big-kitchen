import { useState } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils/index.ts'

const apiPlanUrl = process.env.REACT_APP_API_PLANURL

const useProductionList = () => {
  const [data, setData] = useState([])

  useMount(() => {
    fetch(`${apiPlanUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planList = dataJson.data.List
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            PlanName : item.PlanName,
            PlanStartTime : item.PlanStartTime,
            PlanEndTime : item.PlanEndTime,
            TaskNumber : item.TaskNumber,
            CheckStatusName : item.CheckStatusName,
            ProductCode : item.ProductCode,
            key: item.ProductCode
          }
          data.push(panInfo)
        })
        setData(data)
      }
    })
  })
  return {data, setData}
}

let ProdutionListContainer = createContainer(useProductionList)
export default ProdutionListContainer