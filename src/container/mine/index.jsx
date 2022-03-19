import { useState } from 'react';
import { createContainer } from "unstated-next";
import { useMount } from '../../utils/index.ts';

const useMine = () => {
  const [time, setTimeStr] = useState('')  //时间
  const [btnDisabled] = useState(false)
  const [ReceivingTaskList, setReceivingTaskList] = useState([])  //接货
  const [WarehousingTaskList, setWarehousingTaskList] = useState([])  //入库
  const [PickingTaskList, setPickingTaskList] = useState([])  //领料
  const [QualityInspectionTaskList, setQualityInspectionTaskList] = useState([])  //质检
  const [ProductTaskList, setProductTaskList] = useState([])  //生产
  const [SampleRetentionTaskList, setSampleRetentionTaskList] = useState([])  //留样
  const [PackingTaskList, setPackingTaskList] = useState([])  //包装
  const [LoadingTaskList, setLoadingTaskList] = useState([])  //配送
  const [peopleInfo, setPeopleInfo] = useState([])  //人员信息
  const [equipmentStartTaskList, setEquipmentStartTaskList] = useState([]) //设备启动
  const [equipmentMaintainTaskList, setEquipmentMaintainTaskList] = useState([]) //设备维护
  const [equipmentByTaskList, setEquipmentByTaskList] = useState([]) //设备保养
  const [AbnormalTaskList, setAbnormalTaskList] = useState([]); //异常看板
  const [ForemanTaskList, setForemanTaskList] = useState([]); //班组长

  useMount(() => {
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
    fetch('GetTaskList').then(async (response) => {
      if (response.ok) {
        let res = await response.json();
        res.data.List.ReceivingTaskList.map((item) => (
          item.btn = { 'content': '接货开始', flag: 0 }
        ))
        res.data.List.WarehousingTaskList.map((item, index) => (
          item.btn = { 'content': '入库开始', flag: 0 }
        ))
        res.data.List.PickingTaskList.map((item, index) => (
          item.btn = { 'content': '领料开始', flag: 0 }
        ))
        res.data.List.ProductTaskList.map((item, index) => (
          item.btn = { 'content': '生产开始', flag: 0 }
        ))
        res.data.List.SampleRetentionTaskList.map((item, index) => (
          item.btn = { 'content': '留样开始', flag: 0 }
        ))
        res.data.List.LoadingTaskList.map((item, index) => (
          item.btn = { 'content': '配送开始', flag: 0 }
        ))
        res.data.List.QualityInspectionTaskList.map((item, index) => (
          item.btn = { 'content': '质检开始', flag: 0 }
        ))
        res.data.List.LoadingTaskList.map((item, index) => (
          item.btn = { 'content': '配送开始', flag: 0 }
        ))
        res.data.List.PackingTaskList.map((item, index) => (
          item.btn = { 'content': '包装开始', flag: 0 }
        ))
        setReceivingTaskList(res.data.List.ReceivingTaskList || [])
        setWarehousingTaskList(res.data.List.WarehousingTaskList || [])
        setPickingTaskList(res.data.List.PickingTaskList || [])
        setQualityInspectionTaskList(res.data.List.QualityInspectionTaskList || [])
        setProductTaskList(res.data.List.ProductTaskList || [])
        setSampleRetentionTaskList(res.data.List.SampleRetentionTaskList || [])
        setPackingTaskList(res.data.List.PackingTaskList || [])
        setLoadingTaskList(res.data.List.LoadingTaskList || [])

        setEquipmentStartTaskList(res.data.List.EquipmentStartTaskList || [])
        setEquipmentMaintainTaskList(res.data.List.EquipmentMaintainTaskList || [])
        setEquipmentByTaskList(res.data.List.EquipmentByTaskList || [])
        setAbnormalTaskList(res.data.List.AbnormalTaskList || [])
        setForemanTaskList(res.data.List.ForemanTaskList || [])
      }
    })

    //获取人员基本信息
    fetch('GetEmployee/YG_01010001').then(async (response) => {
      if (response.ok) {
        let res = await response.json();
        setPeopleInfo(res.Employee || [])
      }
    })

    //模拟假数据
    // var obj = {

    //   "WarehousingTaskList": [
    //     {
    //       "TaskId": "c892egivkvf4ln613090",
    //       "BatchNumber": "c892egivkvf4ln613090",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "入库任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "土豆",
    //       "Specification": "整框",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 1,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "2022-02-21 07:00",
    //       "PlanEndTime": "2022-02-21 08:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "2022/02/20 22:27:32",
    //       "FrontTaskId": "c892egivkvf4ln61308g",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111001113",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "入库任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "白菜",
    //       "Specification": "整筐",
    //       "Quantity": 20,
    //       "Weight": 2000,
    //       "ActualWeighing": 2000,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/02/20 22:27:36",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "GD_20220111001112",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "入库任务",
    //       "TaskStatus": "已完成",
    //       "GoodsName": "土豆",
    //       "Specification": "整筐",
    //       "Quantity": 30,
    //       "Weight": 3000,
    //       "ActualWeighing": 3000,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/02/20 22:32:41",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "入库任务",
    //       "TaskStatus": "已完成",
    //       "GoodsName": "萝卜",
    //       "Specification": "整筐",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/02/20 23:32:47",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     }
    //   ],
    //   "ReceivingTaskList": [
    //     {
    //       "TaskId": "c892egivkvf4ln61308g",
    //       "BatchNumber": "c892egivkvf4ln61308g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货任务",
    //       "TaskStatus": "已完成",
    //       "GoodsName": "土豆",
    //       "Specification": "整框",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 1,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "2022-02-21 06:00",
    //       "PlanEndTime": "2022-02-21 07:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "2022/02/20 23:32:42",
    //       "FrontTaskId": "",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "接货任务",
    //       "TaskStatus": "已完成",
    //       "GoodsName": "土豆",
    //       "Specification": "整筐",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/02/20 23:33:39",
    //       "FrontTaskId": "GD_20220111001133",
    //       "Order": 1,
    //       "Belongto": "GY01-0001",
    //       "WorkingProcedureId": "GX01-11111"
    //     }
    //   ],
    //   "PickingTaskList": [
    //     {
    //       "TaskId": "GD_20220111001113",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "领料任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "萝卜",
    //       "Specification": "整筐",
    //       "Quantity": 20,
    //       "Weight": 2000,
    //       "ActualWeighing": 2000,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "GD_20220111001112",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "领料任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "白菜",
    //       "Specification": "整筐",
    //       "Quantity": 30,
    //       "Weight": 3000,
    //       "ActualWeighing": 3000,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/02/20 22:21:55",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "c892egivkvf4ln61309g",
    //       "BatchNumber": "c892egivkvf4ln61309g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "领料任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "土豆",
    //       "Specification": "整框",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 1,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "2022-02-21 08:00",
    //       "PlanEndTime": "2022-02-21 09:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892egivkvf4ln613090",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "领料任务",
    //       "TaskStatus": "执行中",
    //       "GoodsName": "土豆",
    //       "Specification": "整筐",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 0,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     }
    //   ],
    //   "ExwarehouseTaskList": [
    //     {
    //       "TaskId": "c892egivkvf4ln6130a0",
    //       "BatchNumber": "c892egivkvf4ln6130a0",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "出库任务",
    //       "TaskStatus": "待执行",
    //       "GoodsName": "土豆",
    //       "Specification": "整框",
    //       "Quantity": 26,
    //       "Weight": 2600,
    //       "ActualWeighing": 2600,
    //       "Unit": "公斤",
    //       "WorkingHours": 1,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "2022-02-21 09:00",
    //       "PlanEndTime": "2022-02-21 10:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892egivkvf4ln61309g",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     }
    //   ],
    //   "ProductTaskList": [
    //     {
    //       "TaskId": "c89297qvkvf4ln612t6g",
    //       "ProductCode": "tf202201012633",
    //       "BatchNumber": "c89297qvkvf4ln612t6g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "生产任务",
    //       "TaskStatus": "已完成",
    //       "WorkingProcedureName": "",
    //       "Produce": "",
    //       "Unit": "吨",
    //       "Quantity": 26,
    //       "Station": "",
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "",
    //       "PlanEndTime": "0001-01-01 00:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "c89297qvkvf4ln612t60"
    //     },
    //     {
    //       "TaskId": "c89297ivkvf4ln612t3g",
    //       "ProductCode": "tf202201012633",
    //       "BatchNumber": "c89297ivkvf4ln612t3g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "生产任务",
    //       "TaskStatus": "待执行",
    //       "WorkingProcedureName": "",
    //       "Produce": "",
    //       "Unit": "吨",
    //       "Quantity": 26,
    //       "Station": "",
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "",
    //       "PlanEndTime": "0001-01-01 00:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "2022/02/20 22:22:02",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "c89297ivkvf4ln612t30"
    //     },
    //     {
    //       "TaskId": "c892egivkvf4ln6130b0",
    //       "ProductCode": "tf202201012633",
    //       "BatchNumber": "c892egivkvf4ln6130b0",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "生产任务",
    //       "TaskStatus": "待执行",
    //       "WorkingProcedureName": "分拣土豆22222",
    //       "Produce": "标准土豆",
    //       "Unit": "吨",
    //       "Quantity": 26,
    //       "Station": "",
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "2022-02-21 11:00",
    //       "PlanEndTime": "2022-02-21 13:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892egivkvf4ln6130ag",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "ProductCode": "tf202201012633",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "生产任务",
    //       "TaskStatus": "执行中",
    //       "WorkingProcedureName": "分拣土豆",
    //       "Produce": "标准土豆",
    //       "Unit": "吨",
    //       "Quantity": 26,
    //       "Station": "A1土豆分拣机",
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "GD_20220111001133",
    //       "Order": 1,
    //       "Belongto": "GY01-0001",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c89297qvkvf4ln612t5g",
    //       "ProductCode": "tf202201012633",
    //       "BatchNumber": "c89297qvkvf4ln612t5g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "生产任务",
    //       "TaskStatus": "待执行",
    //       "WorkingProcedureName": "",
    //       "Produce": "",
    //       "Unit": "吨",
    //       "Quantity": 26,
    //       "Station": "",
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "",
    //       "PlanEndTime": "0001-01-01 00:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "c89297qvkvf4ln612t50"
    //     }
    //   ],
    //   "PackingTaskList": [
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "装箱任务",
    //       "TaskStatus": "执行中",
    //       "Specification": "箱",
    //       "PlanQuantity": 260,
    //       "ActualQuantity": 138,
    //       "Station": "A1土豆分拣机",
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 20,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "GD_20220111001133",
    //       "Order": 1,
    //       "Belongto": "GY01-0001",
    //       "WorkingProcedureId": "GX01-11111"
    //     }
    //   ],
    //   "SampleRetentionTaskList": [
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "抽样留样",
    //       "TaskType": "留样任务",
    //       "TaskStatus": "执行中",
    //       "TaskName": "凉拌土豆丝留样",
    //       "SampleRetentionType": "样品",
    //       "Unit": "份",
    //       "Quantity": 10,
    //       "Station": "A1分装机",
    //       "StorageLocation": "",
    //       "SampleRetentionResult": "正常",
    //       "AbnormalResult": "无",
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 5,
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "GD_20220111001133",
    //       "Order": 1,
    //       "Belongto": "GY01-0001",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892bqivkvf4ln612t7g",
    //       "BatchNumber": "c892bqivkvf4ln612t7g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "留样任务",
    //       "TaskStatus": "待执行",
    //       "TaskName": "凉拌土豆丝留样",
    //       "SampleRetentionType": "样品",
    //       "Unit": "份",
    //       "Quantity": 10,
    //       "Station": "A1分装机",
    //       "StorageLocation": "",
    //       "SampleRetentionResult": "正常",
    //       "AbnormalResult": "无",
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompletedQuantity": 0,
    //       "PlanStartTime": "",
    //       "PlanEndTime": "0001-01-01 02:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     }
    //   ],
    //   "QualityInspectionTaskList": [
    //     {
    //       "TaskId": "c892d92vkvf4ln612uug",
    //       "BatchNumber": "c892d92vkvf4ln612uug",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d92vkvf4ln612uu0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892ecqvkvf4ln61302g",
    //       "BatchNumber": "c892ecqvkvf4ln61302g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892ecqvkvf4ln613020",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d1qvkvf4ln612u6g",
    //       "BatchNumber": "c892d1qvkvf4ln612u6g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d1qvkvf4ln612u60",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892ed2vkvf4ln61306g",
    //       "BatchNumber": "c892ed2vkvf4ln61306g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892ed2vkvf4ln613060",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892cqqvkvf4ln612tqg",
    //       "BatchNumber": "c892cqqvkvf4ln612tqg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892cqqvkvf4ln612tq0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d4avkvf4ln612umg",
    //       "BatchNumber": "c892d4avkvf4ln612umg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d4avkvf4ln612um0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892dbqvkvf4ln612vmg",
    //       "BatchNumber": "c892dbqvkvf4ln612vmg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892dbqvkvf4ln612vm0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "",
    //       "BatchNumber": "",
    //       "TaskContent": "",
    //       "TaskType": "",
    //       "ProductionLine": "",
    //       "TaskStatus": "已完成",
    //       "QualityInspectionContent": "",
    //       "InspectionRequirements": "",
    //       "TicketInspection": "",
    //       "AnnexName": "",
    //       "TicketAttachment": "",
    //       "Unit": "",
    //       "InspectionQuantity": 0,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "",
    //       "EmployeeName": "",
    //       "InspectionStandard": "",
    //       "PlanStartTime": "",
    //       "PlanEndTime": "",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "2022/02/20 11:10:31",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "c892cr2vkvf4ln612tu0",
    //       "BatchNumber": "c892cr2vkvf4ln612tu0",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892cr2vkvf4ln612ttg",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d42vkvf4ln612ueg",
    //       "BatchNumber": "c892d42vkvf4ln612ueg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d42vkvf4ln612ue0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892bqqvkvf4ln612tag",
    //       "BatchNumber": "c892bqqvkvf4ln612tag",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892bqqvkvf4ln612ta0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892dbqvkvf4ln612vig",
    //       "BatchNumber": "c892dbqvkvf4ln612vig",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892dbqvkvf4ln612vi0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111002224",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "上货质检03",
    //       "ProductionLine": "产线03",
    //       "TaskStatus": "执行中",
    //       "QualityInspectionContent": "白菜品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "合格证",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 1,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "",
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "c892db2vkvf4ln612veg",
    //       "BatchNumber": "c892db2vkvf4ln612veg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892db2vkvf4ln612ve0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892bqqvkvf4ln612teg",
    //       "BatchNumber": "c892bqqvkvf4ln612teg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892bqqvkvf4ln612te0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d42vkvf4ln612uig",
    //       "BatchNumber": "c892d42vkvf4ln612uig",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d42vkvf4ln612ui0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892cqqvkvf4ln612tmg",
    //       "BatchNumber": "c892cqqvkvf4ln612tmg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892cqqvkvf4ln612tm0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892c2qvkvf4ln612tig",
    //       "BatchNumber": "c892c2qvkvf4ln612tig",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892c2qvkvf4ln612ti0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d92vkvf4ln612uqg",
    //       "BatchNumber": "c892d92vkvf4ln612uqg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d92vkvf4ln612uq0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892ecivkvf4ln612vug",
    //       "BatchNumber": "c892ecivkvf4ln612vug",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892ecivkvf4ln612vu0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111002222",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "上货质检01",
    //       "ProductionLine": "产线01",
    //       "TaskStatus": "未开始",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "不合格",
    //       "AnnexName": "合格证",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 2,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "",
    //       "PlanStartTime": "2022/01/01 07:00",
    //       "PlanEndTime": "2022/01/01 08:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "c892dc2vkvf4ln612vqg",
    //       "BatchNumber": "c892dc2vkvf4ln612vqg",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892dc2vkvf4ln612vq0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d1ivkvf4ln612u2g",
    //       "BatchNumber": "c892d1ivkvf4ln612u2g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d1ivkvf4ln612u20",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d1qvkvf4ln612ua0",
    //       "BatchNumber": "c892d1qvkvf4ln612ua0",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d1qvkvf4ln612u9g",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892daqvkvf4ln612vag",
    //       "BatchNumber": "c892daqvkvf4ln612vag",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892daqvkvf4ln612va0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892d9avkvf4ln612v2g",
    //       "BatchNumber": "c892d9avkvf4ln612v2g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892d9avkvf4ln612v20",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892egivkvf4ln6130ag",
    //       "BatchNumber": "c892egivkvf4ln6130ag",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892egivkvf4ln6130a0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "c892daqvkvf4ln612v6g",
    //       "BatchNumber": "c892daqvkvf4ln612v6g",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "接货质检任务",
    //       "ProductionLine": "水煮肉片生产线",
    //       "TaskStatus": "待执行",
    //       "QualityInspectionContent": "土豆品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 0,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "ZJ10023",
    //       "PlanStartTime": "2022-02-21 10:00",
    //       "PlanEndTime": "2022-02-21 11:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892daqvkvf4ln612v60",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111002223",
    //       "BatchNumber": "20220111001",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "上货质检02",
    //       "ProductionLine": "产线02",
    //       "TaskStatus": "未开始",
    //       "QualityInspectionContent": "白菜品质",
    //       "InspectionRequirements": "外观尺寸",
    //       "TicketInspection": "合格",
    //       "AnnexName": "合格证",
    //       "TicketAttachment": "url...",
    //       "Unit": "公斤",
    //       "InspectionQuantity": 10,
    //       "UnqualifiedNumber": 5,
    //       "EmployeeId": "YG_01010001",
    //       "EmployeeName": "张三",
    //       "InspectionStandard": "",
    //       "PlanStartTime": "2022/01/01 07:00",
    //       "PlanEndTime": "2022/01/01 08:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     }
    //   ],
    //   "LoadingTaskList": [
    //     {
    //       "TaskId": "GD_20220111001122",
    //       "BatchNumber": "20220111002",
    //       "OrderCode": "erp2022121123",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "配送任务",
    //       "DeliverPort": 10,
    //       "EmployeeId": "YG_010100221",
    //       "EmployeeName": "李四",
    //       "CompanyName": "远同快送",
    //       "CarNumber": "川ART777",
    //       "CustomerName": "成都城铁",
    //       "CustomerAddress": "成都市武侯区ZZ路18号",
    //       "GoodsNumber": "G_00101101",
    //       "GoodsName": "盒饭",
    //       "Specifications": "箱",
    //       "Quantity": 20,
    //       "ActualQuantity": 0,
    //       "LoadingStatus": "已完成",
    //       "TaskStatus": "执行中",
    //       "DistributionPoint": [
    //         {
    //           "TaskId": "配送点1",
    //           "BatchNumber": "2022/01/01 06:00"
    //         },
    //         {
    //           "TaskId": "配送点2",
    //           "BatchNumber": "2022/01/01 08:00"
    //         }
    //       ],
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     },
    //     {
    //       "TaskId": "c892egivkvf4ln6130bg",
    //       "BatchNumber": "c892egivkvf4ln6130bg",
    //       "OrderCode": "",
    //       "TaskContent": "XXXXXX",
    //       "TaskType": "配送任务",
    //       "DeliverPort": 10,
    //       "EmployeeId": "YG00001",
    //       "EmployeeName": "张三",
    //       "CompanyName": "成都地铁",
    //       "CarNumber": "川ART666",
    //       "CustomerName": "",
    //       "CustomerAddress": "成都市武侯区ZZ路18号",
    //       "GoodsNumber": "G_00101101",
    //       "GoodsName": "盒饭",
    //       "Specifications": "箱",
    //       "Quantity": 20,
    //       "ActualQuantity": 0,
    //       "LoadingStatus": "待装车",
    //       "TaskStatus": "待执行",
    //       "DistributionPoint": [
    //         {
    //           "TaskId": "",
    //           "BatchNumber": ""
    //         }
    //       ],
    //       "PlanStartTime": "2022-02-21 13:00",
    //       "PlanEndTime": "2022-02-21 14:00",
    //       "ActualStartTime": "",
    //       "ActualEndTime": "",
    //       "FrontTaskId": "c892egivkvf4ln6130b0",
    //       "Order": 1,
    //       "Belongto": "c8927kqvkvf4ln612stg",
    //       "WorkingProcedureId": "GX01-11111"
    //     },
    //     {
    //       "TaskId": "GD_20220111001111",
    //       "BatchNumber": "20220111001",
    //       "OrderCode": "erp2022121112",
    //       "TaskContent": "XXXXXXX",
    //       "TaskType": "配送任务",
    //       "DeliverPort": 10,
    //       "EmployeeId": "YG_010100231",
    //       "EmployeeName": "张三",
    //       "CompanyName": "运达快送",
    //       "CarNumber": "川ART666",
    //       "CustomerName": "成都城铁",
    //       "CustomerAddress": "成都市武侯区ZZ路18号",
    //       "GoodsNumber": "G_00101101",
    //       "GoodsName": "盒饭",
    //       "Specifications": "箱",
    //       "Quantity": 20,
    //       "ActualQuantity": 0,
    //       "LoadingStatus": "已完成",
    //       "TaskStatus": "执行中",
    //       "DistributionPoint": [
    //         {
    //           "TaskId": "配送点1",
    //           "BatchNumber": "2022/01/01 06:00"
    //         },
    //         {
    //           "TaskId": "配送点2",
    //           "BatchNumber": "2022/01/01 08:00"
    //         }
    //       ],
    //       "PlanStartTime": "2022/01/01 06:00",
    //       "PlanEndTime": "2022/01/01 07:00",
    //       "ActualStartTime": "2022/01/01 06:00",
    //       "ActualEndTime": "2022/01/01 07:00",
    //       "FrontTaskId": "",
    //       "Order": 0,
    //       "Belongto": "",
    //       "WorkingProcedureId": ""
    //     }
    //   ],
    //   'EquipmentStartTaskList': [
    //     {
    //       'TaskId': 1,
    //       'equipmentName': '产线数字看板', //设备名称
    //       'taskStatus': '成功', //设备启动
    //       'equipmentPosition': '当前设备', //设备位置
    //       'employeeName': '张三', //执行人
    //       'equipmentCode': 'PC20220105006', //设备编号
    //       'maintenanceStatus': '在保', //维保状态
    //       'lastMaintenanceTime': '20210408', //上次维保
    //       'brand': '弗里尔', //设配品牌
    //       'equipmentModel': 'FWS-156', //设备型号
    //       'workingStatus': '转速1000', //运行状态
    //     },
    //     {
    //       'TaskId': 2,
    //       'equipmentName': '肉类分割机', //设备名称
    //       'taskStatus': '成功', //设备启动
    //       'equipmentPosition': '二层切割区', //设备位置
    //       'employeeName': '张三', //执行人
    //       'equipmentCode': 'PC20220105006', //设备编号
    //       'maintenanceStatus': '在保', //维保状态
    //       'lastMaintenanceTime': '20210408', //上次维保
    //       'brand': '弗里尔', //设配品牌
    //       'equipmentModel': 'FWS-156', //设备型号
    //       'workingStatus': '转速1000', //运行状态
    //     }
    //   ],
    //   'EquipmentMaintainTaskList': [
    //     {
    //       'equipmentName': '产线数字看板', //设备名称
    //       'isFault': '是', //设备故障
    //       'equipmentPosition': '产线数字看板', //设备位置
    //       'equipmentCode': 'S2514', //设备编号
    //       'frontTaskId': 'SCGD20220105006', //生产工单
    //       'actualStartTime': '11:00', //开始时间
    //       'equipmentModel': 'FWS-156', //设备型号
    //       'brand': '弗里尔', //设配品牌
    //       'serviceLife': '5', //使用年限
    //       'faultType': '电机故障',//故障类型
    //       'repairContent': '', //维修内容
    //     }
    //   ],
    //   'EquipmentByTaskList': [
    //     {
    //       'TaskId': 1,
    //       'equipmentName': '产线数字看板', //设备名称
    //       'isFault': '否', //设备故障
    //       'equipmentPosition': '当前设备', //设备位置
    //       'equipmentCode': 'S2514', //设备编号
    //       'frontTaskId': 'SCGD20220105006', //生产工单
    //       'maintenanceStatus': '在保', //维保状态
    //       'lastMaintenanceTime': '20210408', //上次维保
    //       'brand': '弗里尔', //设配品牌
    //       'equipmentModel': 'FWS-156', //设备型号
    //       'workingStatus': '转速1000', //运行状态
    //       'serviceLife': '5', //使用年限
    //     }
    //   ],
    //   'AbnormalTaskList': [
    //     {
    //       'TaskId': 1,
    //       'produce': '净土豆丝', //货品名称
    //       'batchNumber': 'PC112214', //批次号
    //       'basketCode': 'K5471', //筐编号
    //       'abnormalCause': '未识别物品', //异常原因
    //       'occurrenceTime': '11:01', //发生时间
    //     }
    //   ],
    //   'ForemanTaskList': [
    //     {
    //       'TotalBatchNumber': '1', //总批次号
    //       'TotalPersonnel': '1', //总人员
    //       'TotalTasks': '23', //总任务量
    //       'Completed': '23', //已完成
    //       'Incomplete': '0', //未完成
    //       'CompletionRate': '100%', //完成率
    //     }
    //   ]
    // }
    // console.log(obj, 'obj')
    // obj.ReceivingTaskList.map((item) => (
    //   item.btn = { 'content': '接货开始', flag: 0 }
    // ))
    // obj.WarehousingTaskList.map((item, index) => (
    //   item.btn = { 'content': '入库开始', flag: 0 }
    // ))
    // obj.PickingTaskList.map((item, index) => (
    //   item.btn = { 'content': '领料开始', flag: 0 }
    // ))
    // obj.ProductTaskList.map((item, index) => (
    //   item.btn = { 'content': '生产开始', flag: 0 }
    // ))
    // obj.SampleRetentionTaskList.map((item, index) => (
    //   item.btn = { 'content': '留样开始', flag: 0 }
    // ))
    // obj.LoadingTaskList.map((item, index) => (
    //   item.btn = { 'content': '配送开始', flag: 0 }
    // ))
    // obj.QualityInspectionTaskList.map((item, index) => (
    //   item.btn = { 'content': '质检开始', flag: 0 }
    // ))
    // obj.LoadingTaskList.map((item, index) => (
    //   item.btn = { 'content': '配送开始', flag: 0 }
    // ))
    // obj.PackingTaskList.map((item, index) => (
    //   item.btn = { 'content': '包装开始', flag: 0 }
    // ))
    // setReceivingTaskList(obj.ReceivingTaskList || [])
    // setWarehousingTaskList(obj.WarehousingTaskList || [])
    // setPickingTaskList(obj.PickingTaskList || [])
    // setQualityInspectionTaskList(obj.QualityInspectionTaskList || [])
    // setProductTaskList(obj.ProductTaskList || [])
    // setSampleRetentionTaskList(obj.SampleRetentionTaskList || [])
    // setPackingTaskList(obj.PackingTaskList || [])
    // setLoadingTaskList(obj.LoadingTaskList || [])
    // setEquipmentStartTaskList(obj.EquipmentStartTaskList || [])
    // setEquipmentMaintainTaskList(obj.EquipmentMaintainTaskList || [])
    // setEquipmentByTaskList(obj.EquipmentByTaskList || [])
    // setAbnormalTaskList(obj.AbnormalTaskList || [])
    // setForemanTaskList(obj.ForemanTaskList || [])
  })

  const getNow = (s) => {
    return s < 10 ? '0' + s : s;
  }

  //计算剩余时间
  const residueTime = (PlanStartTime, PlanEndTime, ActualStartTime) => {
    let startTime = new Date(PlanStartTime); // 开始时间
    let endTime = new Date(PlanEndTime); // 结束时间
    let PlanTime = endTime - startTime; // 相差的毫秒数

    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    //当前时间
    var now = year + '/' + getNow(month) + "/" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);

    let ActualstartTime = new Date(ActualStartTime); // 开始时间
    let ActualendTime = new Date(now); // 当前时间
    let ActualusedTime = ActualendTime - ActualstartTime; // 相差的毫秒数

    let usedTime = PlanTime - ActualusedTime;

    if (usedTime > 0) {
      let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
      let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
      return (days ? days + '天' : '') + (hours ? hours + '小时' : '') + (minutes ? minutes + '分钟' : '')
    } else {
      return '已超时'
    }

  }

  //计算剩余用时
  const residueTime2 = (StartTime, EndTime) => {
    let startTime = new Date(StartTime); // 开始时间
    let endTime = new Date(EndTime); // 结束时间
    let PlanTime = endTime - startTime; // 相差的毫秒数
    if (PlanTime > 0) {
      let days = Math.floor(PlanTime / (24 * 3600 * 1000)); // 计算出天数
      let leavel = PlanTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
      let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
      let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
      let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
      return (days ? getNow(days) + ':' : '') + (hours ? getNow(hours) + ':' : '00') + (minutes ? getNow(minutes) : '00')
    } else {
      return ''
    }

  }

  //修改不合格数量-质检
  const UnqualifiedNumber = (e, item, index) => {
    setQualityInspectionTaskList(QualityInspectionTaskList.map((item, i) =>
      i === index ? { ...item, UnqualifiedNumber: e } : item
    ))
  }

  const addNumber = (item) => {
    setQualityInspectionTaskList(QualityInspectionTaskList.map((item) =>
      ({ ...item, UnqualifiedNumber: item.UnqualifiedNumber + 1 })
    ))
  }

  const sbutractNumber = (item) => {
    setQualityInspectionTaskList(QualityInspectionTaskList.map((item) =>
      ({ ...item, UnqualifiedNumber: item.UnqualifiedNumber - 1 })
    ))
  }

  //任务提交事件
  const TaskStartClick = (item, index, flag) => {

    var TaskType = '';
    if (flag === 1) {
      TaskType = '接货任务'
    } else if (flag === 2) {
      TaskType = '入库任务'
    } else if (flag === 3) {
      TaskType = '领料任务'
    } else if (flag === 4) {
      TaskType = '生产任务'
    } else if (flag === 5) {
      TaskType = '留样任务'
    } else if (flag === 6) {
      TaskType = '包装任务'
    } else if (flag === 7) {
      TaskType = '质检任务'
    } else if (flag === 8) {
      TaskType = '配送任务'
    }

    //各类型按钮开始
    if (item.btn.flag === 0) {
      var postData = { 'TaskId': item.TaskId, 'TaskType': TaskType }
      fetch('TaskStart', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(postData)
      }).then(async (response) => {
        if (response.ok) {
          // let res = await response.json();
          //接货任务
          if (flag === '1') {
            setReceivingTaskList(ReceivingTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '接货结束', flag: 1 } } : item
            ))
          }

          //入库任务
          if (flag === '2') {
            setWarehousingTaskList(WarehousingTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '入库结束', flag: 1 } } : item
            ))
          }

          //领料任务
          if (flag === '3') {
            setPickingTaskList(PickingTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '领料结束', flag: 1 } } : item
            ))
          }

          //生产任务
          if (flag === '4') {
            setProductTaskList(ProductTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '生产结束', flag: 1 } } : item
            ))
          }

          //留样任务
          if (flag === '5') {
            setSampleRetentionTaskList(SampleRetentionTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '确定留样', flag: 1 } } : item
            ))
          }

          //包装任务
          if (flag === '6') {
            setPackingTaskList(PackingTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '确定并提交', flag: 1 } } : item
            ))
          }

          //质检任务
          if (flag === '7') {
            setQualityInspectionTaskList(QualityInspectionTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '确定并提交', flag: 1 } } : item
            ))
          }

          //配送任务
          if (flag === '8') {
            setLoadingTaskList(LoadingTaskList.map((item, i) =>
              i === index ? { ...item, btn: { content: '完成配送', flag: 1 } } : item
            ))
          }

        }
      });
    }
    //各类型按钮结束
    if (item.btn.flag === 1) {
      //接货任务
      if (flag === 1) {
        var data = { 'TaskId': item.TaskId }
        fetch('ReceivingTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //入库
      if (flag === '2') {
        fetch('WarehousingTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //领料
      if (flag === '3') {
        fetch('PickingTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //生产
      if (flag === '4') {
        fetch('ProductTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //留样
      if (flag === '5') {
        fetch('SampleRetentionTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //包装
      if (flag === '6') {
        fetch('PackingTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //质检
      if (flag === '7') {
        fetch('QualityInspectionTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId, 'UnqualifiedNumber': item.UnqualifiedNumber })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }

      //配送
      if (flag === '8') {
        fetch('LoadingTaskSubmit', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ 'TaskId': item.TaskId })
        }).then(async (response) => {
          // let res = await response.json();
        })
      }
    }
  }
  return { peopleInfo, ReceivingTaskList, WarehousingTaskList, PickingTaskList, ProductTaskList, SampleRetentionTaskList, ForemanTaskList, AbnormalTaskList, PackingTaskList, QualityInspectionTaskList, LoadingTaskList, equipmentStartTaskList, equipmentMaintainTaskList, equipmentByTaskList, time, btnDisabled, residueTime, residueTime2, UnqualifiedNumber, addNumber, sbutractNumber, TaskStartClick }
}

let MineContainer = createContainer(useMine)
export default MineContainer
