import ProduceManageContainer from '../../container/producemanage'
import {Col, Descriptions, List, Progress, Row, Space} from 'antd'
import './index.less'

export const ProduceManagePage = () => {
  let manage = ProduceManageContainer.useContainer();

  function Hours(no) {
    return <p>{no}</p>;
  }

  function computePercent(status, total){
    let denominator = total === 0 ? 1 : total
    let molecular = status ? status.complete : 0
    return (molecular*100)/(denominator*100)*100
  }
  function computeOntime(status, total){
    let denominator = total === 0 ? 1 : total
    let molecular = status ? status.ontime : 0
    return (molecular*100)/(denominator*100)*100
  }
  function computeTask(task){
    let denominator = task.detail ? task.detail[0].quantity : 1
    let molecular = task.status.processingAmount
    return (molecular*100)/(denominator*100)*100
  }

  return (
      <div className="container">
        <div className="produce-container">
          <div className="produce-plan-today">
            {/*<h2 className="common-title">今日生产计划执行概况</h2>*/}
            <Row className="row-box">
              <Col span={4}>
                <div className="survey-box">
                  <h5>计划总数</h5>
                  <span>{manage.plans.length}</span>
                </div>
              </Col>
              <Col span={8}>
                <div className="survey-box">
                  <h5>任务完成率</h5>
                  <span className="cyan">{computePercent(manage.gstatus, manage.gstatus.tasks)}<strong>%</strong></span>
                </div>
                <div className="progress-step">
                  <h6>任务完成数：{manage.gstatus.complete}</h6>
                  <Progress percent={computePercent(manage.gstatus, manage.gstatus.tasks)} showInfo={false} trailColor="#E5E8F2" strokeColor="#6C6CE5"/>
                  <h6>任务总数：{manage.gstatus.tasks}</h6>
                  <Progress percent={100} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0"/>
                </div>
              </Col>
              <Col span={8}>
                <div className="survey-box">
                  <h5>任务准时率</h5>
                  <span className="cyan">{computeOntime(manage.gstatus, manage.gstatus.tasks)}<strong>%</strong></span>
                </div>
                <div className="progress-step-circle">
                  <Progress
                      type="circle"
                      showInfo={false}
                      trailColor="#E9E9F5"
                      strokeColor={{
                        '0%': '#7878E8',
                        '100%': '#C1C1FD',
                      }}
                      strokeWidth={10}
                      percent={computeOntime(manage.gstatus, manage.gstatus.tasks)}
                  />
                </div>
              </Col>
              <Col span={4}>
                <div className="survey-box">
                  <h5>超时计划</h5>
                  <span className="red">{manage.gstatus.overtime}</span>
                </div>
              </Col>
            </Row>
          </div>

          <div className="produce-lists">
            <Row className="list-header">
              <Col span={1}>序号</Col>
              <Col span={2}>计划名称</Col>
              <Col span={3}>计划状态</Col>
              <Col span={2}>完成度</Col>
              <Col span={16} className="date-content">
                <div className="date">
                  <span>03月28日</span>
                  <span>03月29日</span>
                </div>
                <div className="hour">
                  {Array.from(Array(19).keys()).map((value) => Hours(value))}
                </div>
              </Col>
            </Row>

            { manage.plans.map( plan => (
              <div className="list-box listActive">
                <Row className="list">
                  <Col span={1}>{plan.no}</Col>
                  <Col span={2}><strong>{plan.planName}</strong></Col>
                  <Col span={3} style={{color: '#24B5D0'}}>进行中</Col>
                  <Col span={2}>{computePercent(manage.status[plan.planId], plan.taskList.length)}%</Col>
                  <Col span={16} className="date-content clearfix">
                    <b className="line fl" style={{width: '20%'}}/>
                    <p className="fl"><span>{manage.status[plan.planId]?manage.status[plan.planId].complete:0}/{plan.taskList.length}</span><strong>0</strong></p>
                    <Progress percent={computePercent(manage.status[plan.planId], plan.taskList.length)} trailColor="#fff" strokeColor="#FED9E1" strokeWidth={50} className="fl"
                              style={{width: '50%'}}/>
                  </Col>
                </Row>
                <div className="list-content">
                  <div className="flex">
                    <Descriptions column={2}>
                      <Descriptions.Item label="计划起止时间" span={2}>
                        {plan.PlanStartTime + " - " + plan.PlanEndTime}
                      </Descriptions.Item>
                      <Descriptions.Item label="批次">{plan.batchSn}</Descriptions.Item>
                      <Descriptions.Item label="生产计划号">{plan.planId}</Descriptions.Item>
                      <Descriptions.Item label="状态">进行中</Descriptions.Item>
                      <Descriptions.Item label="任务总数">{plan.taskList.length}</Descriptions.Item>
                      {/*<Descriptions.Item label="产成品">{plan.planName}</Descriptions.Item>*/}
                      {/*<Descriptions.Item label="数量">{manage.status[plan.planId]?manage.status[plan.planId].quantity:0}</Descriptions.Item>*/}
                    </Descriptions>

                    <ul className="list-info">
                      <li>
                        <Space align="start">
                          <div>
                            <h4>{computePercent(manage.status[plan.planId], plan.taskList.length)}%</h4>
                            <b className="icon"> </b>
                          </div>
                          <Progress
                              type="circle"
                              trailColor="#fff"
                              strokeColor={{
                                '0%': '#6C6CE5',
                                '100%': '#E0E0FF',
                              }}
                              width={180}
                              strokeWidth={15}
                              percent={computePercent(manage.status[plan.planId], plan.taskList.length)+50}
                          />
                        </Space>
                      </li>
                      <li>
                        <h4>超时任务</h4>
                        <span className="number"><strong>{manage.status[plan.planId]?manage.status[plan.planId].overtime:0}</strong>个</span>
                      </li>
                      <li>
                        <h4>执行中</h4>
                        <Space align="start">
                          <b className="icon"> </b>
                          <span className="number"><strong>{manage.status[plan.planId]?manage.status[plan.planId].ontime:0}</strong>个</span>
                        </Space>
                      </li>
                      <li>
                        <h4>已完成</h4>
                        <span className="number"><strong>{manage.status[plan.planId]?manage.status[plan.planId].complete:0}</strong>个</span>
                      </li>
                    </ul>
                  </div>
                  <List className="list-card"
                    grid={{gutter: 16, column: 4}}
                    dataSource={manage.tasks[plan.planId]}
                    renderItem={item => (
                        <List.Item>
                          <div className="bg">
                            <div className="round-triangle">
                              <b className="bd"/>
                            </div>
                            <List.Item.Meta
                                title={item.title}
                                description={item.description}
                            />
                            <ol className="list-task">
                              <li>
                                <p><b>物料</b><b>{item.sku}</b></p>
                                <p><b>工单内容</b><b>{item.content}</b></p>
                                <p><b>数量</b><b>{item.amount + item.unit}</b></p>
                                <p><b>任务耗时</b><b>{item.secs}</b></p>
                                <p>
                                  <b>进度</b>
                                  <Progress percent={computeTask(item)} trailColor="#D2D5E5" strokeColor="#FF4B4B"
                                            strokeWidth={12}/>
                                  <div className="time">
                                    <div className="clearfix">
                                      <span className="fl">{item.status.startAt}</span>
                                      <span className="fr">{item.status.startAt+item.status.processingTime}</span>
                                    </div>
                                  </div>
                                </p>
                              </li>
                            </ol>
                          </div>
                        </List.Item>
                    )}
                  />
                </div>
                <b className="icon-arrow"><b/></b>
              </div>
            ))},

          </div>
        </div>
      </div>
  )
}
