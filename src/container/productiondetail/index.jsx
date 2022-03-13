import { useState, useEffect } from 'react'
import { createContainer } from "unstated-next"
import { useMount } from '../../utils/index.ts'

const apiPlanTrialUrl = process.env.REACT_APP_API_PLANTRIALURL

const useProductionDetail = () => {
  const [data, setData] = useState([])
  const [taskId, setTaskId] = useState('')
  const [peopleName, setPeopleName] = useState('')

  useMount(() => {
    fetch(`${apiPlanTrialUrl}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        let planTrialList = dataJson.data.List
        let param = window.location.search;
        let param2 = param.split('=');
        let param3 = param2[1];
        let data = []
        planTrialList.forEach((item, index) => {
          let panInfo = {
            TaskId: item.TaskId,
            WorkingProcedureName: item.WorkingProcedureName,
            TaskType: item.TaskType,
            TaskContent: item.TaskContent,
            PlanStartTime: item.PlanStartTime,
            PlanEndTime: item.PlanEndTime,
            EmployeeName: item.EmployeeName,
            key: item.TaskId,
            ProductCode: item.ProductCode
          }
          if (param3 === item.ProductCode) {
            data.push(panInfo)
          }
        })
        setData(data)
      }
    })
  })

  return { data, setData, setTaskId, setPeopleName }
}

let ProdutionDetailContainer = createContainer(useProductionDetail)
export default ProdutionDetailContainer