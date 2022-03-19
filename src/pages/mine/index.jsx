import MineContainer from '../../container/mine'
import { Row, Col, Space, Button, Progress, Collapse, Descriptions, Input, InputNumber } from 'antd'
import { PoweroffOutlined, BarsOutlined } from '@ant-design/icons'
import './index.less'

import ReceivingBoard from '../../component/bulletinBoard/receiving'; //接货看板
import WarehousingBoard from '../../component/bulletinBoard/warehousing'; //入库看板
import PickingBoard from '../../component/bulletinBoard/picking'; //领料看板
import ProductBoard from '../../component/bulletinBoard/product'; //生产看板
import SampleRetentionBoard from '../../component/bulletinBoard/sampleRetention'; //留样看板
import PackingBoard from '../../component/bulletinBoard/packing'; //包装看板
import QualityInspectionBoard from '../../component/bulletinBoard/qualityInspection'; //质检看板
import LoadingBoard from '../../component/bulletinBoard/loading'; //配送看板
import EquipmentStartBoard from '../../component/bulletinBoard/equipmentStart'; //设备启动
import EquipmentMaintainBoard from '../../component/bulletinBoard/equipmentMaintain'; //设备维护
import EquipmentByBoard from '../../component/bulletinBoard/equipmentBy'; //设备维护
import AbnormalBoard from '../../component/bulletinBoard/abnormal'; //异常看板
import Foreman from '../../component/bulletinBoard/foreman'; //班组长看板

export const MinePage = () => {
  let mine = MineContainer.useContainer()
  const { Panel } = Collapse
  const lists = [
    {
      key: 0,
      title: '全部',
      number: 10
    },
    {
      key: 1,
      title: '进行中',
      number: 1
    },
    {
      key: 2,
      title: '即将超时',
      number: 1
    },
    {
      key: 3,
      title: '待执行',
      number: 11
    },
    {
      key: 4,
      title: '已完成',
      number: 10
    },
  ]

  //接货头部
  const genExtra = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="工单内容">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="规格">{JSON.parse(item).Specification || ''}</Descriptions.Item>
      <Descriptions.Item label="重量">{JSON.parse(item).Weight + JSON.parse(item).Unit || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
        {JSON.parse(item).PlanStartTime ? JSON.parse(item).PlanStartTime.split(' ')[1] + ' - ' : '-- - '}{JSON.parse(item).PlanEndTime ? JSON.parse(item).PlanEndTime.split(' ')[1] : '--'}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

  //生产头部
  const genExtrasc = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="工单内容">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="工序">{JSON.parse(item).WorkingProcedureName || ''}</Descriptions.Item>
      <Descriptions.Item label="重量">{JSON.parse(item).Quantity + JSON.parse(item).Unit || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">{JSON.parse(item).PlanStartTime.split(' ')[1] + '-' + JSON.parse(item).PlanEndTime.split(' ')[1]}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

  // 留样头部
  const genExtraly = (item) => (
    <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
      <Descriptions.Item label="任务名称">{JSON.parse(item).TaskName || ''}</Descriptions.Item>
      <Descriptions.Item label="批次号">{JSON.parse(item).BatchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="留样产线">{JSON.parse(item).Station || ''}</Descriptions.Item>
      <Descriptions.Item label="存放位置">{JSON.parse(item).StorageLocation || ''}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
  )

  // 包装头部
  const genExtrabz = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="生产批次">{JSON.parse(item).BatchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="包装规格">{JSON.parse(item).Specification || ''}</Descriptions.Item>
      <Descriptions.Item label="计划产量">{JSON.parse(item).PlanQuantity || ''}</Descriptions.Item>
      <Descriptions.Item label="实际产量">{JSON.parse(item).ActualQuantity || ''}</Descriptions.Item>
      <Descriptions.Item label="完成率">{JSON.parse(item).ActualQuantity ? ((JSON.parse(item).ActualQuantity / JSON.parse(item).PlanQuantity).toFixed(2)) * 100 + '%' : '-'}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

  // 质检头部
  const genExtrazj = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="检验内容">{JSON.parse(item).QualityInspectionContent || ''}</Descriptions.Item>
      <Descriptions.Item label="检验产线">{JSON.parse(item).ProductionLine || ''}</Descriptions.Item>
      <Descriptions.Item label="检验要求">{JSON.parse(item).InspectionRequirements || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
        {/* {JSON.parse(item).PlanStartTime.split(' ')[1] + '-' + JSON.parse(item).PlanEndTime.split(' ')[1]} */}
        {JSON.parse(item).PlanStartTime ? JSON.parse(item).PlanStartTime.split(' ')[1] + ' - ' : '-- - '}{JSON.parse(item).PlanEndTime ? JSON.parse(item).PlanEndTime.split(' ')[1] : '--'}
      </Descriptions.Item>
      <Descriptions.Item label="合格率">{JSON.parse(item).InspectionQuantity ? ((JSON.parse(item).InspectionQuantity - JSON.parse(item).UnqualifiedNumber) / JSON.parse(item).InspectionQuantity) * 100 + '%' : '-'}</Descriptions.Item>
    </Descriptions>
  )

  // 配送头部
  const genExtraps = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="工单内容">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="配送口">{JSON.parse(item).DeliverPort || ''}</Descriptions.Item>
      <Descriptions.Item label="车牌号">{JSON.parse(item).CarNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
        {JSON.parse(item).PlanStartTime ? JSON.parse(item).PlanStartTime.split(' ')[1] + ' - ' : '-- - '}{JSON.parse(item).PlanEndTime ? JSON.parse(item).PlanEndTime.split(' ')[1] : '--'}
      </Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
  )

  // 设备启动头部
  const genExtrasbqd = (item) => (
    <Descriptions layout="vertical" size={'default'} column={4} className="des-box">
      <Descriptions.Item label="设备名称">{JSON.parse(item).equipmentName || ''}</Descriptions.Item>
      <Descriptions.Item label="设备启动">{JSON.parse(item).taskStatus || ''}</Descriptions.Item>
      <Descriptions.Item label="设备位置">{JSON.parse(item).equipmentPosition || ''}</Descriptions.Item>
      <Descriptions.Item label="执行人">{JSON.parse(item).employeeName || ''}</Descriptions.Item>
    </Descriptions>
  )

  // 设备维护头部
  const genExtrasbwh = (item) => (
    <Descriptions layout="vertical" size={'default'} column={4} className="des-box">
      <Descriptions.Item label="设备名称">{JSON.parse(item).equipmentName || ''}</Descriptions.Item>
      <Descriptions.Item label="设备故障">{JSON.parse(item).isFault || ''}</Descriptions.Item>
      <Descriptions.Item label="设备位置">{JSON.parse(item).equipmentPosition || ''}</Descriptions.Item>
      <Descriptions.Item label="设备编号">{JSON.parse(item).equipmentCode || ''}</Descriptions.Item>
    </Descriptions>
  )

  //异常上报
  const genExtraycsb = (item) => (
    <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
      <Descriptions.Item label="货品名称">{JSON.parse(item).produce || ''}</Descriptions.Item>
      <Descriptions.Item label="批次号">{JSON.parse(item).batchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="筐编号">{JSON.parse(item).basketCode || ''}</Descriptions.Item>
      <Descriptions.Item label="异常原因">{JSON.parse(item).abnormalCause || ''}</Descriptions.Item>
      <Descriptions.Item label="发生时间">{JSON.parse(item).occurrenceTime || ''}</Descriptions.Item>
    </Descriptions>
  )

  //班组长
  const genExtraBzz= (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="总批次号">{JSON.parse(item).TotalBatchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="总人员">{JSON.parse(item).TotalPersonnel || ''}</Descriptions.Item>
      <Descriptions.Item label="总任务量">{JSON.parse(item).TotalTasks || ''}</Descriptions.Item>
      <Descriptions.Item label="已完成">{JSON.parse(item).Completed || ''}</Descriptions.Item>
      <Descriptions.Item label="未完成">{JSON.parse(item).Incomplete || ''}</Descriptions.Item>
      <Descriptions.Item label="完成率">{JSON.parse(item).CompletionRate || ''}</Descriptions.Item>
    </Descriptions>
  )


  return (
    <div className="bulletin-board-container">
      <Row>
        <Col span={6} className="bulletin-board-left">
          <div className="employee-info">
            <div className="date">{mine.time.split(' ')[0]}<span>{mine.time.split(' ')[1]}</span></div>
            <Space align="start">
              <img className="header-url" src="https://avatars.githubusercontent.com/u/22983816?s=40&v=4" alt="" />
              <div className="data">
                <h6>{mine.peopleInfo.Name || ''}</h6>
                <p>{mine.peopleInfo.EmployeeId || ''}</p>
              </div>
            </Space>
            <div className="btn">
              <Button className="leave-btn"><b className="icon-leave"></b>请假</Button>
              <Button className="quit-btn"><PoweroffOutlined />退出</Button>
            </div>
          </div>
          <div className="work-progress">
            <h3 className="commit-title">
              <b className="icon-progress"></b> 工作进度</h3>
            <Progress percent={20}
              trailColor={"#F7F7FF"}
              strokeColor={{
                '0%': '#7071DB',
                '100%': '#6364D9',
              }} />
            <div className="legend-box">
              <span><b></b>总工作量</span>
              <span><b></b>已完成</span>
            </div>
          </div>
          <div className="news-container">
            <img src={require('../../style/img/icon/news.png')} alt="" />
          </div>
        </Col>
        <Col span={18} className="bulletin-board-right">
          <div className="task-container">
            <Space align="center" className="task-list-box">
              <h3 className="commit-title"><b className="icon-task"></b></h3>
              <div className="task-list">
                <b className="icon-nav-arrow"></b>
                {/*<LeftCircleOutlined className="icon-arrow" style={{ color: '#4C515D' }} />*/}
                <Collapse accordion className="collapse-list">
                  <Panel header="" key={1} showArrow={false}>
                    {
                      lists.map((item, index) => {
                        return (
                          <p key={item}>{item.title}（{item.number}）</p>
                        )
                      })
                    }
                  </Panel>
                </Collapse>
              </div>
            </Space>
            {/* 列表 */}
            <Collapse defaultActiveKey={['0']} className="lists" showArrow={false}>

              {/* 接货 */}
              {
                mine.ReceivingTaskList && mine.ReceivingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={index} showArrow={false}>
                      <ReceivingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 入库 */}

              {
                mine.WarehousingTaskList && mine.WarehousingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId + '1'} showArrow={false}>
                      <WarehousingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 领料 */}
              {
                mine.PickingTaskList && mine.PickingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId + '2'} showArrow={false}>
                      <PickingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 生产 */}
              {
                mine.ProductTaskList && mine.ProductTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasc(`${JSON.stringify(item)}`)} key={item.TaskId + '3'} showArrow={false}>
                      <ProductBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 留样 */}
              {
                mine.SampleRetentionTaskList && mine.SampleRetentionTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraly(`${JSON.stringify(item)}`)} key={item.TaskId + '4'} showArrow={false}>
                      <SampleRetentionBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 装箱（包装） */}
              {
                mine.PackingTaskList && mine.PackingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrabz(`${JSON.stringify(item)}`)} key={item.TaskId + '5'} showArrow={false}>
                      <PackingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 质检 */}
              {
                mine.QualityInspectionTaskList && mine.QualityInspectionTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.TaskId + '6'} showArrow={false}>
                      <QualityInspectionBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 配送 */}
              {
                mine.LoadingTaskList && mine.LoadingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraps(`${JSON.stringify(item)}`)} key={item.TaskId + '7'} showArrow={false}>
                      <LoadingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备启动 */}
              {
                mine.equipmentStartTaskList && mine.equipmentStartTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbqd(`${JSON.stringify(item)}`)} key={item.TaskId + '8'} showArrow={false}>
                      <EquipmentStartBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备维护 */}
              {
                mine.equipmentMaintainTaskList && mine.equipmentMaintainTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbwh(`${JSON.stringify(item)}`)} key={item.TaskId + '9'} showArrow={false}>
                      <EquipmentMaintainBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备保养 */}
              {
                mine.equipmentByTaskList && mine.equipmentByTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbwh(`${JSON.stringify(item)}`)} key={item.TaskId + '10'} showArrow={false}>
                      <EquipmentByBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 异常上报 */}
              {
                mine.AbnormalTaskList && mine.AbnormalTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraycsb(`${JSON.stringify(item)}`)} key={item.TaskId + '11'} showArrow={false}>
                      <AbnormalBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 班组长 */}
              {
                mine.ForemanTaskList && mine.ForemanTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraBzz(`${JSON.stringify(item)}`)} key={item.TaskId + '12'} showArrow={false}>
                      <Foreman data={item} index={index} />
                    </Panel>
                  )
                })
              }

            </Collapse>
          </div>
        </Col>
      </Row>
    </div>
  )
}