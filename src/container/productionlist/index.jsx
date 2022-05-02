import { useState } from 'react'
import { createContainer } from "unstated-next"
import {getAnchorModel, useMount} from '../../utils'
import {APS_Server} from "../../common";

// const apiPlanUrl = process.env.REACT_APP_API_PLANURL
const apiPlanUrl = APS_Server + "/data/blockchain/plans?model="

const useProductionList = () => {
  const [data, setData] = useState([])

  let url = apiPlanUrl + getAnchorModel()
  useMount(() => {
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        console.log(planList)
        let data = []
        planList.forEach((item, index) => {
          let panInfo = {
            PlanName : item.planName,
            PlanStartTime : item.startAt,
            PlanEndTime : item.startAt + item.duration,
            TaskNumber : item.taskList.length,
            CheckStatusName : item.productQuantity,
            Batch : item.batchSn,
            PlanIndex : item.planIndex,
            key: item.planId
          }
          data.push(panInfo)
        })
        setData(data)
      }
    })
  })
  return {data, setData}
}

let ProductionListContainer = createContainer(useProductionList)
export default ProductionListContainer
