import MineContainer from '../../container/mine'
import {Row, Col, Space, Button, Progress, Collapse, Descriptions, Spin, Alert, Modal, Table} from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import './index.less'

import SupplementBoard from '../bulletinBoard/supplement'; //补单
import ReceivingBoard from '../bulletinBoard/receiving'; //接货看板
import WarehousingBoard from '../bulletinBoard/warehousing'; //入库看板
import PickingBoard from '../bulletinBoard/picking'; //领料看板
import ProductBoard from '../bulletinBoard/product'; //生产看板
import SampleRetentionBoard from '../bulletinBoard/sampleRetention'; //留样看板
import PackingBoard from '../bulletinBoard/packing'; //包装看板
import QualityInspectionBoard from '../bulletinBoard/qualityInspection'; //质检看板
import QualityControlBoard from '../bulletinBoard/qualityControl'; //质检看板
import LoadingBoard from '../bulletinBoard/loading'; //配送看板
import EquipmentStartBoard from '../bulletinBoard/equipmentStart'; //设备启动
import EquipmentMaintainBoard from '../bulletinBoard/equipmentMaintain'; //设备维护
import EquipmentByBoard from '../bulletinBoard/equipmentBy'; //设备维护
import AbnormalBoard from '../bulletinBoard/abnormal'; //异常看板
import ForemanBoard from '../bulletinBoard/foreman'; //班组长看板
import BasketBoard from '../bulletinBoard/basket'; //回筐
import ReturnWarehouseBoard from '../bulletinBoard/returnWarehouse'; //返库
import InventoryBoard from '../bulletinBoard/Inventory';
import SimpleTask from "../bulletinBoard/clean";
import React from "react"; //返库

export const MinePage = () => {
  let mine = MineContainer.useContainer()
  const { Panel } = Collapse

    const logOff = () => {
        window.location = `/#/unicardswipe`
    }

    //补单模拟数据
    let supplementList = [{
        'supplementId':'999',
        'goodsName':'土豆',
        'batchNumber':'001',
        'specifications':'筐',
        'supplementNumber':'10',
        'happenTime':'2022-02-21 09:00',
        'reason':'土豆数量不足'
    },{
        'supplementId':'998',
        'goodsName':'净土豆丝',
        'batchNumber':'002',
        'specifications':'筐',
        'supplementNumber':'20',
        'happenTime':'2022-02-21 09:00',
        'reason':'净土豆丝产能不足'
    }]

  //接货头部
  const genExtra = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="物料">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="规格">{JSON.parse(item).Specification || ''}</Descriptions.Item>
      <Descriptions.Item label="重量">{JSON.parse(item).Weight + JSON.parse(item).Unit || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
        {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}</Descriptions.Item>
      <Descriptions.Item contentStyle={{color:"red"}} label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

    const genExtrall = (item) => (
        <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
            <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
            <Descriptions.Item label="批次号">{JSON.parse(item).batchNumber || ''}</Descriptions.Item>
            <Descriptions.Item label="计划起止时间">
                {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}</Descriptions.Item>
            <Descriptions.Item label="实际起止时间">
                {JSON.parse(item).ActualStartTime + ' - ' + JSON.parse(item).ActualEndTime}</Descriptions.Item>
            <Descriptions.Item contentStyle={{color:"red"}} label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
        </Descriptions>
    )

  //生产头部
  const genExtrasc = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="产成品">{JSON.parse(item).Production || ''}</Descriptions.Item>
      <Descriptions.Item label="工序">{JSON.parse(item).Order|| ''}</Descriptions.Item>
      <Descriptions.Item label="计划产出">{JSON.parse(item).OutputQuantity + JSON.parse(item).Unit || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
            {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
      </Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

    //simple
    const genExtrasp = (item) => (
        <Descriptions layout="vertical" size={'default'} column={4} className="des-box">
            <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
            <Descriptions.Item label="计划起止时间">
                {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
            </Descriptions.Item>
            <Descriptions.Item label="实际起止时间">
                {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
            </Descriptions.Item>
            <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
        </Descriptions>
    )

  // 留样头部
  const genExtraly = (item) => (
    <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
      <Descriptions.Item label="任务名称">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="批次号">{JSON.parse(item).batchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="留样产线">{JSON.parse(item).Station || ''}</Descriptions.Item>
      <Descriptions.Item label="存放位置">{JSON.parse(item).StorageLocation || ''}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
  )

  // 包装头部
  const genExtrabz = (item) => (
    <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
        <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="包装规格">{JSON.parse(item).specUnit || ''}</Descriptions.Item>
      <Descriptions.Item label="包装数量">{JSON.parse(item).specAmount || ''}</Descriptions.Item>
      <Descriptions.Item label="完成率">{JSON.parse(item).rate + '%'}</Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus}</Descriptions.Item>
    </Descriptions>
  )

  // 接货质检头部
  const genExtrazj = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="检验物品">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="检验产线">{JSON.parse(item).ProdLine || ''}</Descriptions.Item>
      <Descriptions.Item label="检验要求">{JSON.parse(item).Requirment || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
            {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
      </Descriptions.Item>
    </Descriptions>
  )

  // 配送头部
  const genExtraps = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="配送口">{JSON.parse(item).dock?.dockSn || ''}</Descriptions.Item>
      <Descriptions.Item label="车牌号">{JSON.parse(item).carNumber || ''}</Descriptions.Item>
        <Descriptions.Item label="司机">{JSON.parse(item).driverName || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
          {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
      </Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
  )

  // 设备启动头部
  const genExtrasbqd = (item) => (
    <Descriptions layout="vertical" size={'default'} column={4} className="des-box">
      <Descriptions.Item label="设备名称">{JSON.parse(item).equipmentName || ''}</Descriptions.Item>
      <Descriptions.Item label="是否已启动">{JSON.parse(item).taskStatus || ''}</Descriptions.Item>
      <Descriptions.Item label="设备位置">{JSON.parse(item).equipmentPosition || ''}</Descriptions.Item>
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

    //回筐
    const genExtrahk = (item) => (
        <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
            <Descriptions.Item label="任务类型">{item.taskType || ''}</Descriptions.Item>
            <Descriptions.Item label="筐总量">{item.allCount || ''}</Descriptions.Item>
            <Descriptions.Item label="今日回筐">{item.returnCount || ''}</Descriptions.Item>
            <Descriptions.Item label="坏筐">{item.damageCount || ''}</Descriptions.Item>
            <Descriptions.Item label="待回筐">{item.awaitNumber || ''}</Descriptions.Item>
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
  const genExtraBzz = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="总批次号">{JSON.parse(item).TotalBatchNumber || ''}</Descriptions.Item>
      <Descriptions.Item label="总人员">{JSON.parse(item).TotalPersonnel || ''}</Descriptions.Item>
      <Descriptions.Item label="总任务量">{JSON.parse(item).TotalTasks || ''}</Descriptions.Item>
      <Descriptions.Item label="已完成">{JSON.parse(item).Completed || ''}</Descriptions.Item>
      <Descriptions.Item label="未完成">{JSON.parse(item).Incomplete || ''}</Descriptions.Item>
      <Descriptions.Item label="完成率">{JSON.parse(item).CompletionRate || ''}</Descriptions.Item>
    </Descriptions>
  )

  //盘库
  const genExtraPk = (item) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
      <Descriptions.Item label="任务类型">{JSON.parse(item).TaskType || ''}</Descriptions.Item>
      <Descriptions.Item label="工单号">{JSON.parse(item).TaskId || ''}</Descriptions.Item>
      <Descriptions.Item label="工单内容">{JSON.parse(item).TaskContent || ''}</Descriptions.Item>
      <Descriptions.Item label="仓库">{JSON.parse(item).StorageRoomName || ''}</Descriptions.Item>
      <Descriptions.Item label="计划起止时间">
          {JSON.parse(item).PlanStartTime + ' - ' + JSON.parse(item).PlanEndTime}
      </Descriptions.Item>
      <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
  )

  return (
    <div className="bulletin-board-container">
      <Row>
        <Col span={6} className="bulletin-board-left">
          <div className="employee-info">
            <div className="date">{mine.time.split(' ')[0]}<span>{mine.time.split(' ')[1]}</span></div>
            <Space align="start">
              <img className="header-url" src={"http://123.57.137.181:8090/" + mine.peopleInfo.photo} alt="" />
              <div className="data">
                <h6>{mine.peopleInfo.name || ''}</h6>
                <p>{mine.peopleInfo.employee_id || ''}</p>
              </div>
            </Space>
            <div className="btn">
              <Button className="leave-btn"><b className="icon-leave"/>请假</Button>
              <Button className="quit-btn" onClick={()=>{logOff()}}><PoweroffOutlined />退出</Button>
            </div>
          </div>
          <div className="work-progress">
            <h3 className="commit-title">
              <b className="icon-progress"/> 工作进度</h3>
            <Progress percent={0}
              trailColor={"#F7F7FF"}
              strokeColor={{
                '0%': '#7071DB',
                '100%': '#6364D9',
              }} />
            <div className="legend-box">
              <span><b/>总工作量</span>
              <span><b/>已完成</span>
            </div>
          </div>
          <div className="news-container">
            <img src={require('../../style/img/icon/news.png')} alt="" />
          </div>
        </Col>
        <Col span={18} className="bulletin-board-right">
          <div className="task-container">
            {/*<Space align="center" className="task-list-box">*/}
            {/*  <h3 className="commit-title"><b className="icon-task"/></h3>*/}
            {/*  <div className="task-list">*/}
            {/*    <b className="icon-nav-arrow"/>*/}
            {/*    /!*<LeftCircleOutlined className="icon-arrow" style={{ color: '#4C515D' }} />*!/*/}
            {/*    <Collapse accordion className="collapse-list">*/}
            {/*      <Panel header="" key={1} showArrow={false}>*/}
            {/*        {*/}
            {/*          lists.map((item, index) => {*/}
            {/*            return (*/}
            {/*              <p key={item}>{item.title}（{item.number}）</p>*/}
            {/*            )*/}
            {/*          })*/}
            {/*        }*/}
            {/*      </Panel>*/}
            {/*    </Collapse>*/}
            {/*  </div>*/}
            {/*</Space>*/}
            {/* 列表 */}
            <Collapse defaultActiveKey={['0']} className="lists" showArrow={false}>

              {/* 接货 */}
              {
                mine.model === 'receiving' && mine.taskList.map((item, index) => {
                  return (
                    <Panel onChange={()=> {mine.startTask(item.taskId)}} header="" extra={genExtra(`${JSON.stringify(item)}`)} key={index} showArrow={false}>
                      <ReceivingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 入库 */}
              {
                  mine.model === 'enter' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.taskId + '1'} showArrow={false}>
                      <WarehousingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 领料 */}
              {
                  mine.model === 'picking' && mine.taskList.map((item, index) => {
                  return (
                          <Panel header="" extra={genExtrall(`${JSON.stringify(item)}`)} key={item.taskId + '2'} showArrow={false}>
                              <PickingBoard data={item} index={index} />
                          </Panel>
                  )
                })
              }

              {/* 生产 */}
              {
                  mine.model === 'prod' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasc(`${JSON.stringify(item)}`)} key={item.taskId + '3'} showArrow={false}>
                      <ProductBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }
                {
                    mine.model === 'clean' && mine.taskList.map((item, index) => {
                        return (
                            <Panel header="" extra={genExtrasp(`${JSON.stringify(item)}`)} key={item.taskId + '3'} showArrow={false}>
                                <SimpleTask data={item} index={index} />
                            </Panel>
                        )
                    })
                }
                {
                    mine.model === 'disinfection' && mine.taskList.map((item, index) => {
                        return (
                            <Panel header="" extra={genExtrasp(`${JSON.stringify(item)}`)} key={item.taskId + '3'} showArrow={false}>
                                <SimpleTask data={item} index={index} />
                            </Panel>
                        )
                    })
                }

              {/* 留样 */}
              {
                  mine.model === 'sample' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraly(`${JSON.stringify(item)}`)} key={item.taskId + '4'} showArrow={false}>
                      <SampleRetentionBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 装箱（包装） */}
              {
                  mine.model === 'packing' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrabz(`${JSON.stringify(item)}`)} key={item.taskId + '5'} showArrow={false}>
                      <PackingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 检验 */}
              {
                  mine.model === 'inspection' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.taskId + '6'} showArrow={false}>
                      <QualityInspectionBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

            {/* 品控 */}
            {
                mine.model === 'control' && mine.taskList.map((item, index) => {
                    return (
                        <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.taskId + '8'} showArrow={false}>
                            <QualityControlBoard data={item} index={index} />
                        </Panel>
                    )
                })
            }

                {/* 接货检验 */}
                {
                    mine.model === 'recvinsp' && mine.taskList.map((item, index) => {
                        return (
                            <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.taskId + '7'} showArrow={false}>
                                <QualityInspectionBoard data={item} index={index} />
                            </Panel>
                        )
                    })
                }

                {/* 接货品控 */}
                {
                    mine.model === 'recvctrl' && mine.taskList.map((item, index) => {
                        return (
                            <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.taskId + '9'} showArrow={false}>
                                <QualityControlBoard data={item} index={index} />
                            </Panel>
                        )
                    })
                }

              {/* 配送 */}
              {
                  mine.model === 'loading' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraps(`${JSON.stringify(item)}`)} key={item.taskId + '10'} showArrow={false}>
                      <LoadingBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备启动 */}
              {
                  mine.model === 'poweron' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbqd(`${JSON.stringify(item)}`)} key={item.taskId + '11'} showArrow={false}>
                      <EquipmentStartBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备维修 */}
              {
                  mine.model === 'repaire' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbwh(`${JSON.stringify(item)}`)} key={item.taskId + '12'} showArrow={false}>
                      <EquipmentMaintainBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 设备保养 */}
              {
                  mine.model === 'maintain' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasbwh(`${JSON.stringify(item)}`)} key={item.taskId + '13'} showArrow={false}>
                      <EquipmentByBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 异常上报 */}
              {
                  mine.model === 'exception' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraycsb(`${JSON.stringify(item)}`)} key={item.taskId + '14'} showArrow={false}>
                      <AbnormalBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 班组长 */}
              {
                  mine.model === 'leader' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraBzz(`${JSON.stringify(item)}`)} key={item.taskId + '15'} showArrow={false}>
                      <ForemanBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }

              {/* 回筐 */}
                {
                    mine.model === 'recycle' && mine.taskList.map((item, index) => {
                        return (
                            <Panel header="" extra={genExtrahk(`${JSON.stringify(item)}`)} key={item.taskId + '23'} showArrow={false}>
                                <BasketBoard data={item} index={index}/>
                            </Panel>
                        )
                    })
                }

              {/* 返库 */}
              {
                  mine.model === 'reenter' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrall(`${JSON.stringify(item)}`)} key={item.taskId + '16'} showArrow={false}>
                      <ReturnWarehouseBoard data={item} index={index} />
                    </Panel>
                  )
                })
              }


              {/* 盘库 */}
              {
                  mine.model === 'fixstock' && mine.taskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraPk(`${JSON.stringify(item)}`)} key={item.taskId + '17'} showArrow={false}>
                      <InventoryBoard data={item.inStockSkuList} index={index} />
                    </Panel>
                  )
                })
              }

            </Collapse>
          </div>
        </Col>
      </Row>

    <Modal title=""
           width={300}
           centered
           visible={mine.loading}
           okText="确定"
           className="add-mask"
           footer={[]}
           onCancel={() => {mine.setLoading(false)}}>
        <div className="detail-list">
            <img className="img" src="http://123.57.137.181:8090/Img/loading.gif" alt="loading..."/>
        </div>
    </Modal>
    </div>
  )
}
