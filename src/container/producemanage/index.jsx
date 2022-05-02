import { useState } from 'react';
import { createContainer } from "unstated-next";
import {getAnchorModel, useMount} from '../../utils';
import {APS_Server} from "../../common";

const apiPlanUrl = APS_Server + "/data/blockchain/plans?key="
const apiTaskUrl = APS_Server + "/data/blockchain/tasks?key="
const model = getAnchorModel()
const fmt_time = ((t) => { return t.getHours() + ':' + t.getMinutes()})

const useWorkMange = () => {
  const [tasks, setTasks] = useState({});
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState({});
  const [gstatus, setGstatus] = useState({"complete":0, "ontime":0, "overtime":0, "quantity": 0, "tasks":0});

  let url = apiPlanUrl + model
  let url2 = apiTaskUrl + model
  useMount(async () => {
    let data = []
    let response = await fetch(`${url}`)
    if (response.ok) {
      let dataJson = await response.json()
      // console.log(dataJson.content)
      let planList = JSON.parse(dataJson.content)
      // console.log(planList)
      let no = 0
      planList.forEach((item, index) => {
        no += 1
        let s = new Date(item.startAt)
        let e = new Date(item.startAt + 3600000)
        let panInfo = {
          planId: item.planId.substr(5,10),
          PlanStartTime: fmt_time(s),
          PlanEndTime: fmt_time(e),
          no: no,
          planName: item.planName,
          startAt: item.startAt,
          duration: item.duration,
          batchSn: item.batchSn.substr(5,10),
          taskList: item.taskList,
          key: item.planId,
          rate: 0
        }
        data.push(panInfo)
      })
      setPlans(data)
    }

    response = await fetch(`${url2}`)
    if (response.ok) {
      let planTasks = {}
      let statusMap = {}
      let dataJson = await response.json()
      // console.log(dataJson.content)
      let taskList = JSON.parse(dataJson.content)
      // console.log(taskList)
      data.forEach((plan, index) => {
        let status = { "complete":0, "ontime":0, "overtime":0, "quantity":0 }
        planTasks[plan.planId] = []
        taskList.forEach((task) =>{
          // console.log(task)
          task.amount = task.detail ? task.detail[0].quantity : task.quantity ? task.quantity : task.outputSkuCode[1]
          task.secs = task.info.duration / 60 + '分钟'
          task.unit = 'kg'
          task.sku = task.detail ? task.detail[0].skuCode : task.skuCode
          task.content = task.info.taskDescription
          if ( task.info.planId.substr(5,10) === plan.planId ) {
            planTasks[plan.planId].push(task)
            plan.taskList.push(task.taskId)
            if ( task.status.finished ){
              status.complete += 1;
            }
            if ( task.status.overtimed ){
              status.overtime += 1;
            }else{
              status.ontime += 1;
            }
            gstatus.tasks += 1
            status.quantity += task.status.processingAmount
          }
        })
        statusMap[plan.planId] = status
        gstatus["complete"] += status.complete
        gstatus["ontime"] += status.ontime
        gstatus["overtime"] += status.overtime
        gstatus["quantity"] += status.quantity
      })
      setTasks(planTasks)
      // console.log(taskMap)
      setStatus(statusMap)
      // console.log(statusMap)
      setGstatus(gstatus)
      // console.log(gstatus)
    }
  })

  return {tasks, plans, setTasks, setPlans, status, setStatus, gstatus, setGstatus}
}

let ProduceManageContainer = createContainer(useWorkMange)
export default ProduceManageContainer
