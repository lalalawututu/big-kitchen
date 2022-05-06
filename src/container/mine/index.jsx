import {useState} from 'react';
import {createContainer} from "unstated-next";
import {getAnchorModel, useMount} from '../../utils';
import {APS_Server, Sync_Server, Tracker_Server} from "../../common";


const useMine = () => {

  const stockInfo= [
    {id:'all', title:'全部'},
    {id:'raw', title:'原料库'},
    {id:'seasoning', title:'调料库'},
    {id:'asset', title:'资产库'},
    {id:'packing', title:'包材库'},
    {id:'halfprod', title:'半成品库'},
    {id:'consume', title:'耗材库'},
    {id:'basket', title:'周转筐库'},
    // {id:'production', title:'成品库'},
    // {id:'sample', title:'留样库'},
  ]; //表格数据

  const [time, setTimeStr] = useState('')  //时间
  const [btnDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [exception, setException] = useState(false)
  const [inspResult, setInspResult] = useState(0)
  const [taskList, setTaskList] = useState([
    {
      'taskId': '0000',
      'btn': {'content': '完成上报', flag: 0}
    }
  ])  //任务
  const [peopleInfo, setPeopleInfo] = useState([])  //人员信息

  const apiTaskStartUrl = Tracker_Server + "/status/task/start?key="
  const apiTaskStatusGetUrl = Tracker_Server + "/status/task/get?key="
  const apiTaskSubmitUrl = Tracker_Server + "/status/task/submit?key="
  const fmt_time = ((t) => { return t.getHours() + ':' + t.getMinutes()})
  const model = getAnchorModel()
  const now = new Date().getTime()/1000

  useMount (() => {
    load_tasks()
  })
  const load_tasks = () => {
    let myDate = new Date();
    let Year = myDate.getFullYear();
    let Month = myDate.getMonth() + 1;
    let date = myDate.getDate();
    let h = myDate.getHours();       //获取当前小时数(0-23)
    let m = myDate.getMinutes();     //获取当前分钟数(0-59)
    let s = myDate.getSeconds();
    let timeStr = `${Year}/${Month}/${date} ${h}:${m}:${s}`
    setTimeStr(timeStr)

    //面板请求数据
    const apiTaskUrl = APS_Server + "/data/blockchain/tasks?key="
    let url = apiTaskUrl + model
    fetch(`${url}`).then(async (response) => {
      if (response.ok) {
        let dataJson = await response.json()
        // console.log(dataJson.content)
        let planList = JSON.parse(dataJson.content)
        // console.log(planList)

        var employee = {};
        //获取人员基本信息
        let emp = planList[0].info.employees[0];
        const apiGetEmployeeUrl = Sync_Server + "/data/employee/"+emp
        let response2 = await fetch(`${apiGetEmployeeUrl}`);
        if (response2.ok) {
          let dataJson = await response2.json()
          // console.log(dataJson.content)
          let planList = JSON.parse(dataJson.content)
          // console.log(planList)
          employee = planList
          setPeopleInfo(planList || [])
        }

        //获取任务状态信息
        let planList2 = await Promise.all(planList.map(async function(item, index){
          let url2 = apiTaskStatusGetUrl + item.info.taskId
          let response = await fetch(`${url2}`)
          if (response.ok) {
            let dataJson = await response.json()
            // console.log(dataJson.content)
            if (dataJson.content.length > 0) {
              item.status = JSON.parse(dataJson.content)
            }
          }
          return item
        }))

        setTaskList(planList2.map(function (item, index) {
          item.btn = {'content': item.status.finished ? '已完成' : '完工上报', flag: 0}
          item.info.duration = 3600000
          let id = item.info.taskId.replace(/(.{7}).+(.{7})/, "$1…$2")
          let batch = item.info.batchNumber.replace(/(.{7}).+(.{7})/, "$1…$2")
          let s = new Date(item.info.startAt*1000)
          let e = new Date(item.info.startAt*1000 + item.info.duration)
          let ss = new Date(item.status.startAt*1000)
          let ee = new Date(item.status.finishedAt)
          item.taskId = id
          item.TaskType = item.info.taskDescription
          item.TaskContent = item.detail ? item.detail[0].skuCode : item.skuCode
          item.batchNumber = batch
          item.PlanStartTime = fmt_time(s)
          item.PlanEndTime = fmt_time(e)
          item.ActualStartTime = item.PlanStartTime
          // item.ActualStartTime = item.status.startAt === 0 ? '-- : --' : fmt_time(ss)
          item.ActualEndTime = item.status.finishedAt === 0 ? '-- : --' : fmt_time(ee)
          item.Specification = '包'
          item.Unit = 'kg'
          item.Quantity = item.quantity
          item.TaskStatus = item.status.finished ? '已完成' : item.status.startAt === 0 ? '未开始' : '进行中'
          item.leftSecs = item.status.startAt === 0 ? item.info.duration/1000/60 + '分钟' : (item.info.duration/1000 - (now - item.status.StartAt))/60 + '分钟'
          item.Driver = item.driver?.name
          item.DriverPhone = item.driver?.phone
          item.RecvCarNumber = item.driver?.carNo
          item.Supplier = item.supplierId
          item.employee = employee
          item.ActualWeighing = item.status.processingAmount
          let weight =  0.6
          if (model === 'receiving' || model === 'enter') {
            weight = item.detail.map((de) => de.quantity).reduce((arr, cur) => arr + cur)
          }else if (model === 'prod') {
            item.Production = item.outputSkuCode[0]
            item.OutputQuantity = item.outputSkuCode[1].toFixed(2)
            item.prodrate = (item.ActualWeighing / item.OutputQuantity).toFixed(2) * 100
          }else if (model === 'picking' || model === 'reenter'){
            weight = item.pickDetail.map((de)=>de.quantityNeed).reduce((arr,cur)=> arr + cur)
            item.PickDetail = item.pickDetail.map((detail)=>{
              detail.key = detail.skuCode
              detail.origWarehouse = detail.warehouse
              stockInfo.filter(value=>value.id===detail.warehouse).map(item3=>{
                detail.warehouse = item3.title
              })
              detail.quantityPicking = item.status.processingAmount
              return detail
            })
          }else if (model === 'packing'){
            weight = item.specAmount
          }else if (model === 'loadding'){
            weight = item.quantity
            item.LoadingCarNumber = item.carNumber
            item.DeliverPort = item.dock?.dockName
            item.CustomerName = item.dk
            item.CustomerAddress = item.dk_address
          }else{
            weight = item.quantity
          }
          item.Weight = weight?.toFixed(2)
          item.rate = (item.ActualWeighing / weight).toFixed(2) * 100
          item.Order = item.order
          item.QualifyAmount = item.status.processingAmount - item.unqualifiedAmount
          item.Requirment = item.inspectionContent
          item.Requirements = item.inspectionRequirements ? item.inspectionRequirements[0].split(",") : []
          item.problems = item.inspectionRequirements
          item.ProdLine = item.info.station
          item.supplieBatchNumber = item.supplierBatchCode
          item.UnqualifiedNumber = item.unqualifiedAmount
          item.DeliveryPeriod = item.deliveryPeriod
          item.isFault = '否'
          item.equipmentPosition = item.devicePos
          item.equipmentName = item.deviceName
          item.equipmentCode = item.deviceCode
          item.maintenanceStatus = item.maintainStatus
          item.lastMaintenanceTime = item.lastMaintainAt
          item.brand = item.deviceBrand
          item.serviceLife = item.used
          item.equipmentModel = item.deviceModel
          item.inStockSkuList = item.inStockSku
          item.allCount = item.totalBasket
          item.returnCount = item.todayBackBasket
          item.damageCount = item.damagedBasket
          item.awaitNumber = item.todayNeedBasket
          item.Station = item.info.station
          item.StorageLocation = item.position??item.location??item.storageLocation??'0006'
          item.StockPosition = item.position??item.location??item.storageLocation??'0006'
          item.reasons = item.reason
          item.actions = item.action
          item.StorageRoomName = item.warehouse?.length === 0 ? 'raw' : item.warehouse
          item.Warehouse = item.warehouse?.length === 0 ? 'raw' : item.warehouse
          item.baskets = item.basket
          item.ExceptionReasons = ['货位送到','仓库已满','检验超标','品控不合格','库存不足']
          console.log(item)
          return item
        }))
        setLoading(false)
    }})
  }

  const startTask = (taskId) => {
    let url = apiTaskStartUrl + taskId
    fetch(url, {
      method: 'get',
    }).then(async (response) => {
      if (response.ok) {
        // let dataJson = await response.json()
        // console.log(dataJson)
      }
    });
  }

  const showExceptionModal = () => {
    setException(true)
  }
  //任务提交事件
  //上报
  const TaskSubmitClick = (item, index, flag) => {
    let datas = []
    setLoading(true)
    let data_index = model
    var data = {
      'taskId': item.info.taskId,
      'employeeId': item.employee.employee_id ? item.employee.employee_id : '',
    }
    item.status.processingAmount = 2
    if (model === 'receiving') {
      data.actualWeighing = item.status.processingAmount
      data.skuCode = item.detail[0].skuCode
      data.batch = item.batchNumber
      datas.push(data)
    }
    if (model === 'recvinsp') {
      data_index = 'receiving/insp'
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.unqualifiedCause = item.inspectionContent
      datas.push(data)
    }
    if (model === 'recvctrl') {
      data_index = 'receiving/ctrl'
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.unqualifiedQuantity = item.status.processingAmount
      data.problems = item.inspectionRequirements
      datas.push(data)
    }
    if (model === 'inspection') {
      data_index = 'insp'
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.unqualifiedCause = item.cause
      datas.push(data)
    }
    if (model === 'control') {
      data_index = 'ctrl'
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.unqualified_quantity = item.cause
      data.problems = item.result
      datas.push(data)
    }
    if (model === 'enter') {
      data_index = 'enterstock'
      data.skuCode = item.detail[0].skuCode
      data.batch = item.batchNumber
      data.actualWeighing = item.status.processingAmount
      data.warehouse = item.warehouse
      data.position = item.location
      datas.push(data)
    }
    if (model === 'picking') {
      item.pickDetail.forEach((detail) => {
        data.actualWeighing = item.status.processingAmount //detail.quantityPicking
        data.skuCode = detail.skuCode
        data.batch = item.batchNumber
        data.warehouseName = detail.origWarehouse
        data.locationNumber = detail.position
        datas.push(data)
      })
    }
    if (model === 'reenter') {
      data_index = 'enterstock'
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.actualWeighing = item.ActualWeighing
      data.warehouse = item.Warehouse
      data.position = item.position
      datas.push(data)
    }
    if (model === 'prod') {
      data.skuCode = item.outputSkuCode[0]
      data.batch = item.batchNumber
      data.actualQuantity = item.status.processingAmount
      datas.push(data)
    }
    if (model === 'loading') {
      item.deliveryDetail.forEach((detail) => {
        data.skuCode = detail.skuCode
        data.batch = item.batchNumber
        data.actualQuantity = detail.quantity
        data.orderId = ''
        data.customer = detail.address
        datas.push(data)
      })
    }
    if (model === 'clean') {
      data.reason = '完成'
      data.result = true
      datas.push(data)
    }
    if (model === 'disinfection') {
      data_index = 'disinfect'
      data.reason = '完成'
      data.result = true
      datas.push(data)
    }
    if (model === 'maintain') {
      data.equipment_id = item.equipment_id
      data.equipment_position = item.equipment_position
      data.reason = item.reason
      data.result = item.result
      data.maintain_at = now
      datas.push(data)
    }
    if (model === 'repaire') {
      data.equipment_id = item.equipment_id
      data.equipment_position = item.equipment_position
      data.reason = item.reason
      data.repaire_result = item.result
      data.repaire_at = now
      datas.push(data)
    }
    if (model === 'poweron') {
      data.equipment_id = item.equipment_id
      data.equipment_position = item.equipment_position
      data.startup_status = item.result
      data.start_at = now
      datas.push(data)
    }
    if (model === 'fixstock') {
      data.warehouseName = item.warehouseName
      data.materialList = item.materialList
      datas.push(data)
    }
    if (model === 'recycle') {
      data.returnCount = item.returnCount
      data.damageCount = item.damageCount
      datas.push(data)
    }
    if (model === 'packing') {
      data_index = 'pack'
      data.basketCode = item.basketBarCode
      data.skuCode = item.skuCode
      data.batch = item.batchNumber
      data.totalWeight = item.specAmount
      datas.push(data)
    }
    if (model === 'sample') {
      data_index = 'sampling'
      data.skuCode = item.skuCode
      data.quantity = item.quantity
      data.batch = item.batchNumber
      data.drop = false
      data.storageLocation = item.storageLocation
      data.abnormalResult = ''
      datas.push(data)
    }
    if (model === 'samplehandle') {
      data_index = 'sampling'
      data.sku_code = item.sku_code
      data.quantity = item.quantity
      data.batch = item.batchNumber
      data.drop = true
      data.storage_location = ''
      data.abnormal_result = item.abnormal_result
      datas.push(data)
    }
    if (model === 'exception') {
      data_index = 'warning'
      data.basket_code = item.basket_code
      data.produce = item.skuCode
      data.abnormal_cause = item.abnormal_cause
      data.resolvent = item.resolvent
      data.device_id = item.device_id
      data.occurrence_time = now
      datas.push(data)
    }
    if (model === 'leader') {
    }
    let url = apiTaskSubmitUrl + data_index
    datas.forEach((data) => {
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }).then(async (response) => {
        load_tasks()
      })
    })
  }

  //修改不合格数量-质检
  const UnqualifiedNumber = (e, item, index) => {
    setTaskList(taskList.map((item, i) =>
        i === index ? { ...item, UnqualifiedNumber: e } : item
    ))
  }

  //增加不合格数量-品控
  const addNumber = (item,index) => {
    setTaskList(taskList.map((item, i) =>
        i === index ? { ...item, UnqualifiedNumber: item.UnqualifiedNumber + 1 } : item
    ))
  }

  //减少不合格数量-品控
  const sbutractNumber = (item,index) => {
    setTaskList(taskList.map((item, i) =>
        i === index ? { ...item, UnqualifiedNumber: item.UnqualifiedNumber - 1 } : item
    ))
  }

  return { loading, model, peopleInfo, taskList, time, btnDisabled, exception,
    UnqualifiedNumber, addNumber, sbutractNumber, TaskSubmitClick, startTask, setLoading, showExceptionModal, setException,
    inspResult, setInspResult
  }
}

let MineContainer = createContainer(useMine)
export default MineContainer
