import MineContainer from '../../container/mine'
import { Row, Col, Space, Button, Progress, Collapse, Descriptions, Input, InputNumber } from 'antd'
import { PoweroffOutlined, BarsOutlined } from '@ant-design/icons'
import './index.less'

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
            <img src={require('../../style/img/icon/news.png')} alt=""/>
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
            <Collapse defaultActiveKey={['1']} className="lists" showArrow={false}>
              {/* 接货 */}
              {
                mine.ReceivingTaskList && mine.ReceivingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={index + 1} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际起止时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : ''}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                          <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">
                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 1) }}><b className="icon-submit"></b>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 入库 */}
              {
                mine.WarehousingTaskList && mine.WarehousingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId + '11'} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际起止时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : ''}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                          <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                        </Descriptions>

                        <Row className="">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">
                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskStartClick(item, index, 2) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 领料 */}
              {
                mine.PickingTaskList && mine.PickingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId + '2'} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际起止时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                          <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">

                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={(e) => { mine.TaskStartClick(item, index, 3) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 生产 */}
              {
                mine.ProductTaskList && mine.ProductTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrasc(`${JSON.stringify(item)}`)} key={item.TaskId + '3'} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId}</Descriptions.Item>
                          <Descriptions.Item label="实际起止时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">{item.BatchNumber}</Descriptions.Item>
                          <Descriptions.Item label="产成品">{item.Produce}</Descriptions.Item>
                          <Descriptions.Item label="执行人">{item.EmployeeName}</Descriptions.Item>
                          <Descriptions.Item label="实际完成">{item.CompletedQuantity + item.Unit}</Descriptions.Item>
                          <Descriptions.Item label="完成比例">{((item.CompletedQuantity / item.Quantity).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">

                            {<Button className="submit-btn" onClick={() => { mine.TaskStartClick(item, index, 4) }} icon={<BarsOutlined />}>{item.btn.content}</Button>}
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 留样 */}
              {
                mine.SampleRetentionTaskList && mine.SampleRetentionTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraly(`${JSON.stringify(item)}`)} key={item.TaskId + '5'} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="计划时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="实际时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="留样内容要求">{item.TaskContent || ''}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">
                            <Button className="submit-btn" onClick={(e) => { mine.TaskStartClick(item, index, 5) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 装箱（包装） */}
              {
                mine.PackingTaskList && mine.PackingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrabz(`${JSON.stringify(item)}`)} key={item.TaskId} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="计划开始时间">{item.PlanStartTime ? item.PlanStartTime.split(' ')[1] : '--'}</Descriptions.Item>
                          <Descriptions.Item label="计划结束时间">{item.PlanEndTime ? item.PlanEndTime.split(' ')[1] : '--'}</Descriptions.Item>
                          <Descriptions.Item label="计划用时">{mine.residueTime2(item.PlanStartTime, item.PlanEndTime)}</Descriptions.Item>
                          <Descriptions.Item label="实际开始时间">{item.ActualStartTime ? item.ActualStartTime.split(' ')[1] : '--'}</Descriptions.Item>
                          <Descriptions.Item label="计划结束时间">{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}</Descriptions.Item>
                          <Descriptions.Item label="实际用时">{mine.residueTime2(item.ActualStartTime, item.ActualEndTime)}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">
                            <Button className="submit-btn" onClick={() => { mine.TaskStartClick(item, index, 6) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }


              {/* 质检 */}
              {
                mine.QualityInspectionTaskList && mine.QualityInspectionTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.TaskId} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId}</Descriptions.Item>
                          <Descriptions.Item label="开始时间">{item.ActualStartTime ? item.ActualStartTime.split(' ')[1] : ''}</Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">
                            <Input placeholder="扫描批次号条码" value={item.BatchNumber} allowClear={false} className="batch-number" />
                          </Descriptions.Item>
                          <Descriptions.Item label="索证索票">{item.TicketInspection}</Descriptions.Item>
                          <Descriptions.Item label="索证索票附件">{item.AnnexName}</Descriptions.Item>
                          <Descriptions.Item label="检验数量">{item.InspectionQuantity}</Descriptions.Item>
                          <Descriptions.Item label="规格">{item.Unit}</Descriptions.Item>
                          <Descriptions.Item label="合格数量">{item.InspectionQuantity - item.UnqualifiedNumber}</Descriptions.Item>
                          {/* <Descriptions.Item label="不合格数量">
                                                                <InputNumber min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber}
                                                                    onChange={e => mine.UnqualifiedNumber(e, item, index)} className="unqualified-number" />
                                                            </Descriptions.Item> */}
                        </Descriptions>

                        <Row className="">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container submit-zj-container">
                            <div className="mt unqualified-InputNumber">
                              <h4 className="common-submit-title">不合格数量</h4>
                              <InputNumber controls={false} min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber} value={item.UnqualifiedNumber} />
                              <div className="icon-group">
                                <b className="icon-subtract" onClick={item.UnqualifiedNumber > 0 ? () => mine.sbutractNumber(item) : null}></b>
                                <b className="icon-add" onClick={item.UnqualifiedNumber < 10 ? () => mine.addNumber(item) : null}></b>
                              </div>
                            </div>
                            <div className="mt unqualified-list">
                              <h4 className="common-submit-title">选择不合格原因</h4>
                              <Button className="active">尺寸不达标</Button>
                              <Button>变质</Button>
                              <Button>新鲜度不达标</Button>
                              <Button>有泥土</Button>
                              <Button>发芽</Button>
                              <Button>发霉</Button>
                              <Button>破损</Button>
                              <Button>其他</Button>
                            </div>
                            <Button className="submit-btn" onClick={() => { mine.TaskStartClick(item, index, 7) }}><b class="icon-submit"></b>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                  )
                })
              }

              {/* 配送 */}
              {
                mine.LoadingTaskList && mine.LoadingTaskList.map((item, index) => {
                  return (
                    <Panel header="" extra={genExtraps(`${JSON.stringify(item)}`)} key={item.TaskId + '88'} showArrow={false}>
                      <div className="product-info">
                        <Descriptions size={'default'} column={3} className="des-box">
                          <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际起止时间">
                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                          </Descriptions.Item>
                          <Descriptions.Item label="剩余时间">{mine.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                          <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                          <Descriptions.Item label="客户名称">{item.CustomerName || ''}</Descriptions.Item>
                          <Descriptions.Item label="客户地址">{item.CustomerAddress || ''}</Descriptions.Item>
                          <Descriptions.Item label="物流公司">{item.CompanyName || ''}</Descriptions.Item>
                          <Descriptions.Item label="配送员">{item.EmployeeName || ''}</Descriptions.Item>
                          <Descriptions.Item label="配送员ID">{item.EmployeeId || ''}</Descriptions.Item>
                          <Descriptions.Item label="实际出货">{item.Quantity + item.Specifications}</Descriptions.Item>
                          <Descriptions.Item label="完成比例">{item.BatchNumber || ''}</Descriptions.Item>
                        </Descriptions>

                        <Row className="submit-top">
                          <Col span={6} className="product-progress-box">
                            <div className="product-progress">
                              <Progress percent={20 + index}
                                showInfo={false}
                                type="circle"
                                trailColor={"#E7E1E2"}
                                strokeColor={"#FF4B4B"} />
                              <h5 className="">{20 + index}%<span>工作进度</span></h5>
                            </div>
                            {/*<p>开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间开始时间</p>*/}
                          </Col>
                          <Col span={18} className="submit-container">
                            <Button className="submit-btn" disabled={mine.btnDisabled} onClick={() => { mine.TaskStartClick(item, index, 8) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                          </Col>
                        </Row>
                      </div>
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