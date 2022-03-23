import ProduceManageContainer from '../../container/producemanage'
import { Row, Col, Progress, Space, Descriptions, List, Card } from 'antd'
import history from '../../history';
import './index.less'

export const ProduceManagePage = () => {
  let mange = ProduceManageContainer.useContainer();
  const listData = [
    {
      title: '土豆丝加工',
      description: 'pc15810653733'
    },
    {
      title: '土豆丝加工',
      description: 'pc15810653733'
    },
    {
      title: '炒土豆丝 ',
      description: 'pc15810653733'
    },
    {
      title: '清洗土豆',
      description: 'pc15810653733'
    }
  ];
  return (
    <div className="container">
      <div className="produce-container">
        <div className="produce-plan-today">
          <h2 className="common-title">今日生产计划执行概况</h2>
          <Row className="row-box">
            <Col span={4}>
              <div className="survey-box">
                <h5>计划总数</h5>
                <span>6</span>
              </div>
            </Col>
            <Col span={8}>
              <div className="survey-box">
                <h5>任务完成率</h5>
                <span className="cyan">51<strong>%</strong></span>
              </div>
              <div className="progress-step">
                <h6>任务完成数：0</h6>
                <Progress percent={50} showInfo={false} trailColor="#E5E8F2" strokeColor="#6C6CE5" />
                <h6>任务完成数：6</h6>
                <Progress percent={50} showInfo={false} trailColor="#E5E8F2" strokeColor="#24B5D0" />
              </div>
            </Col>
            <Col span={8}>
              <div className="survey-box">
                <h5>任务准时率</h5>
                <span className="cyan">70<strong>%</strong></span>
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
                    percent={70}
                />
              </div>
            </Col>
            <Col span={4}>
              <div className="survey-box">
                <h5>超时计划</h5>
                <span className="red">6</span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="produce-lists">
          <Row className="list-header">
            <Col span={1}>序号</Col>
            <Col span={2}>任务名称</Col>
            <Col span={3}>生成计划状态</Col>
            <Col span={2}>完成度</Col>
            <Col span={16} className="date-content">
              <div className="date">
                <span>01月20日</span>
                <span>01月21日</span>
              </div>
              <div className="hour">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
              </div>
            </Col>
          </Row>

          <div className="list-box listActive">
            <Row className="list">
              <Col span={1}>01</Col>
              <Col span={2}><strong>酱牛肉</strong></Col>
              <Col span={3} style={{color: '#24B5D0'}}>进行中</Col>
              <Col span={2}>65%</Col>
              <Col span={16} className="date-content clearfix">
                <b className="line fl"  style={{width: '20%'}}></b>
                <p className="fl"><span>01/20</span><strong>03</strong></p>
                <Progress percent={50} trailColor="#fff" strokeColor="#FED9E1" strokeWidth={50} className="fl" style={{width: '50%'}} />
              </Col>
            </Row>
            <div className="list-content">
              <div className="flex">
                <Descriptions column={2}>
                  <Descriptions.Item label="计划起止时间" span={2}>
                    2022/01/03 9:10～2022
                  </Descriptions.Item>
                  <Descriptions.Item label="订单号">erp15810653733</Descriptions.Item>
                  <Descriptions.Item label="生产计划号">1810000000</Descriptions.Item>
                  <Descriptions.Item label="状态">进行中</Descriptions.Item>
                  <Descriptions.Item label="任务总数">6</Descriptions.Item>
                  <Descriptions.Item label="产成品">酸辣土豆丝盒饭</Descriptions.Item>
                  <Descriptions.Item label="数量">1000盒</Descriptions.Item>
                </Descriptions>

                <ul className="list-info">
                  <li>
                    <Space align="start">
                      <div>
                        <h4>准时率</h4>
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
                          percent={90}
                      />
                    </Space>
                  </li>
                  <li>
                    <h4>超时任务</h4>
                    <span className="number"><strong>2</strong>份</span>
                  </li>
                  <li>
                    <h4>执行中</h4>
                    <Space align="start">
                      <b className="icon"> </b>
                      <span className="number"><strong>2</strong>份</span>
                    </Space>
                  </li>
                  <li>
                    <h4>已完成</h4>
                    <span className="number"><strong>2</strong>份</span>
                  </li>
                </ul>
              </div>

              <List className="list-card"
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={listData}
                  renderItem={item => (
                      <List.Item>
                        <div className="bg">
                          <div className="round-triangle">
                            <b className="bd"></b>
                          </div>
                          <List.Item.Meta
                              title={item.title}
                              description={item.description}
                          />
                          <ol className="list-task">
                            <li>
                              <p><b>执行人</b><b>郭郭（1581065）</b></p>
                              <p><b>工单内容</b><b>土豆丝加工</b></p>
                              <p><b>数量</b><b>5吨</b></p>
                              <p><b>任务耗时</b><b>1小时45分钟</b></p>
                              <p>
                                <b>状态</b>
                                <Progress percent={50} trailColor="#D2D5E5" strokeColor="#FF4B4B" strokeWidth={12} />
                                <div className="time">
                                  <div className="clearfix">
                                    <span className="fl">21:30</span>
                                    <span className="fr">23:00</span>
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
            <b className="icon-arrow"><b></b></b>
          </div>

          <div className="list-box">
            <Row className="list">
              <Col span={1}>02</Col>
              <Col span={2}><strong>酸辣土豆丝</strong></Col>
              <Col span={3}>工单已发送</Col>
              <Col span={2}>70%</Col>
              <Col span={16} className="date-content clearfix">
                <b className="line fl"  style={{width: '20%'}}></b>
                <p className="fl"><span>01/21</span><strong>03</strong></p>
                <Progress percent={70} trailColor="#fff" strokeColor="#FED9E1" strokeWidth={50} className="fl" style={{width: '70%'}} />
              </Col>
            </Row>
          </div>

          <div className="list-box">
            <Row className="list">
              <Col span={1}>02</Col>
              <Col span={2}><strong>酸辣土豆丝</strong></Col>
              <Col span={3}>工单已发送</Col>
              <Col span={2}>0%</Col>
              <Col span={16} className="date-content clearfix">
                <b className="line fl"  style={{width: '20%'}}></b>
                {/*<p className="fl"><span>01/21</span><strong>03</strong></p>*/}
                <Progress percent={0} trailColor="#fff" strokeColor="#FED9E1" strokeWidth={50} className="fl" style={{width: '70%'}} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}
