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
      }
    })

    //获取人员基本信息
    fetch('GetEmployee/YG_01010001').then(async (response) => {
      if (response.ok) {
        let res = await response.json();
        setPeopleInfo(res.Employee || [])
      }
    })
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
      console.log(hours, minutes)
      return (days ? this.getNow(days) + ':' : '') + (hours ? this.getNow(hours) + ':' : '00') + (minutes ? this.getNow(minutes) : '00')
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
  return { peopleInfo, ReceivingTaskList, WarehousingTaskList, PickingTaskList, ProductTaskList, SampleRetentionTaskList, PackingTaskList, QualityInspectionTaskList, LoadingTaskList, time, btnDisabled, residueTime, residueTime2, UnqualifiedNumber, addNumber, sbutractNumber, TaskStartClick }
}

let MineContainer = createContainer(useMine)
export default MineContainer
