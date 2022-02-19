import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Space, Button, Progress, Collapse, Descriptions, Input, InputNumber } from 'antd';
import { StockOutlined, PoweroffOutlined, SnippetsFilled, ContainerFilled, LeftCircleOutlined, BarsOutlined } from '@ant-design/icons';
import './index.less';
import { actionCreatorsMine } from './store';

const { Panel } = Collapse;
const apiUrl = process.env.REACT_APP_API_URL;
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
const genExtra = (TaskType,TaskContent,Unit,Quantity,PlanStartTime,PlanEndTime,TaskStatus) => (
    <Descriptions layout="vertical" size={'default'} column={6} className="des-box">
        <Descriptions.Item label="任务类型">{TaskType}</Descriptions.Item>
        <Descriptions.Item label="工单内容">{TaskContent}</Descriptions.Item>
        <Descriptions.Item label="规格">{Unit}</Descriptions.Item>
        <Descriptions.Item label="重量">{Quantity}{Unit}</Descriptions.Item>
        <Descriptions.Item label="计划起止时间">{PlanStartTime}-{PlanEndTime}</Descriptions.Item>
        <Descriptions.Item label="状态">{TaskStatus}</Descriptions.Item>
    </Descriptions>
);

function callback(key) {
}

class Mine extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            time2: '',
            name: '',
            IDNumber: '',
            TaskType: '',
            TaskId: '',
            PlanStartTime: '',
            PlanEndTime: '',
            lastTime: '',
            BatchNumber: '',
            Quantity: '',
            Unit: '',
            CompletedQuantity: '',
            TaskContent: '',
            ActualStartTime: '',
            ActualEndTime: '',
            TaskStatus: ''
        }
    }
    componentDidMount() {
        let myDate = new Date();
        let Year = myDate.getFullYear();
        let Month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let timeStr = `${Year}/${Month}/${date}`
        this.setState({ time: timeStr })
        this.interval = setInterval(() => {
            let myDate2 = new Date();
            let hh = myDate2.getHours() < 10 ? ('0' + myDate2.getHours()) : myDate2.getHours();
            let mm = myDate2.getMinutes() < 10 ? ('0' + myDate2.getMinutes()) : myDate2.getMinutes();
            let ss = myDate2.getSeconds() < 10 ? ('0' + myDate2.getSeconds()) : myDate2.getSeconds();
            let timeStr2 = `${hh}:${mm}:${ss}`
            this.setState({ time2: timeStr2 })
        }, 1000)
        fetch(`${apiUrl}/Employee?EmployeeId=1&Name=张三`).then(async (response) => {
            if (response.ok) {
                let peopleData = await response.json();
                this.setState({ name: peopleData[0].Name })
                this.setState({ IDNumber: peopleData[0].IDNumber })
            }
        });
        fetch(`${apiUrl}/ProductTask`).then(async (response) => {
            if (response.ok) {
                let productData = await response.json();
                console.log(productData)
                this.setState({ TaskType: productData.TaskType })
                this.setState({ TaskContent: productData.TaskContent })
                this.setState({ Unit: productData.Unit })
                this.setState({ Quantity: productData.Quantity })
                this.setState({ PlanStartTime: productData.PlanStartTime })
                this.setState({ PlanEndTime: productData.PlanEndTime })
                this.setState({ TaskStatus: productData.TaskStatus })
                this.setState({ TaskPending: productData.TaskPending })
                this.setState({ TaskId: productData.TaskId })
                this.setState({ ActualStartTime: productData.ActualStartTime })
                this.setState({ ActualEndTime: productData.ActualEndTime })
                this.setState({ lastTime: productData.lastTime })
                this.setState({ BatchNumber: productData.BatchNumber })
                this.setState({ ActualEndTime: productData.ActualEndTime })
                this.setState({ lastTime: productData.lastTime })
                this.setState({ CompletedQuantity: productData.CompletedQuantity })
            }
        });

    }
    render() {
        return (
            <div className="bulletin-board-container">
                <Row>
                    <Col span={6}>
                        <div className="employee-info">
                            <div className="date">{this.state.time}<span>{this.state.time2}</span></div>
                            <Space align="start">
                                <img className="header-url" src="https://avatars.githubusercontent.com/u/22983816?s=40&v=4" alt="" />
                                <div className="data">
                                    <h6>{this.state.name}</h6>
                                    <p>工号:{this.state.IDNumber}</p>
                                    <Button className="leave-btn"><StockOutlined />请假</Button>
                                    <Button className="quit-btn"><PoweroffOutlined />退出</Button>
                                </div>
                            </Space>
                        </div>
                        <div className="work-progress">
                            <h3 className="commit-title"><SnippetsFilled /> 工作进度</h3>
                            <Progress percent={20}
                                trailColor={"#F7F7FF"}
                                strokeColor={{
                                    '0%': '#7071DB',
                                    '100%': '#6364D9',
                                }} />
                        </div>
                    </Col>
                    <Col span={17}>
                        <div className="task-container">
                            <Space align="center" className="task-list-box">
                                <h3 className="commit-title"><ContainerFilled /> 我的任务</h3>

                                <div className="task-list">
                                    <LeftCircleOutlined className="icon-arrow" style={{ color: '#4C515D' }} />
                                    <Collapse accordion className="collapse-list">
                                        <Panel header="" key={1} showArrow={false}>
                                            {
                                                lists.map((item, index) => {
                                                    return (
                                                        <p onClick={callback}>{item.title}（{item.number}）</p>
                                                    )
                                                })
                                            }
                                        </Panel>
                                    </Collapse>
                                </div>
                            </Space>
                            {/* 列表 */}
                            <Collapse defaultActiveKey={['1']} className="lists" showArrow={false} onChange={callback}>
                                <Panel header="" extra={genExtra(this.state.TaskType,
                                    this.state.TaskContent,
                                    this.state.Unit,
                                    this.state.Quantity,
                                    this.state.PlanStartTime,
                                    this.state.PlanEndTime,
                                    this.state.TaskStatus
                                    )} key="1" showArrow={false}>
                                    <div className="product-info">
                                        <div className="product-progress">
                                            任务进度
                                            <Progress percent={this.state.CompletedQuantity}
                                                trailColor={"#E7E1E2"}
                                                strokeColor={"#FF4B4B"} />
                                        </div>
                                        <Descriptions size={'default'} column={3} className="des-box">
                                            <Descriptions.Item label="工单号">{this.state.TaskId}</Descriptions.Item>
                                            <Descriptions.Item label="实际起止时间">{this.state.ActualStartTime}-{this.state.ActualEndTime}</Descriptions.Item>
                                            <Descriptions.Item label="剩余时间">{this.state.lastTime}</Descriptions.Item>
                                            <Descriptions.Item label="批次号">{this.state.BatchNumber}</Descriptions.Item>
                                            <Descriptions.Item label="实际接货重量">{this.state.Quantity}{this.state.Unit}</Descriptions.Item>
                                            <Descriptions.Item label="完成比例">{this.state.CompletedQuantity}%</Descriptions.Item>
                                        </Descriptions>

                                        <Button className="submit-btn" icon={<BarsOutlined />}>接货完成</Button>
                                    </div>
                                </Panel>

                                <Panel header="" extra={genExtra()} key="2" showArrow={false}>
                                    <div className="product-info">
                                        <div className="product-progress">
                                            任务进度
                                            <Progress percent={20}
                                                trailColor={"#E7E1E2"}
                                                strokeColor={"#FF4B4B"} />
                                        </div>
                                        <Descriptions size={'default'} column={3} className="des-box">
                                            <Descriptions.Item label="工单号">SCGD20220105006</Descriptions.Item>
                                            <Descriptions.Item label="实际起止时间">18:00 - 20:00</Descriptions.Item>
                                            <Descriptions.Item label="剩余时间">1小时10分钟</Descriptions.Item>
                                            <Descriptions.Item label="批次号">SCGD20220105006</Descriptions.Item>
                                            <Descriptions.Item label="产成品">标准土豆</Descriptions.Item>
                                            <Descriptions.Item label="执行人">张三</Descriptions.Item>
                                            <Descriptions.Item label="实际完成">6吨</Descriptions.Item>
                                            <Descriptions.Item label="完成比例">60%</Descriptions.Item>
                                        </Descriptions>

                                        <Button className="submit-btn" icon={<BarsOutlined />}>报工完成</Button>
                                    </div>
                                </Panel>

                                <Panel header="" extra={genExtra()} key="3" showArrow={false}>
                                    <div className="product-info">
                                        <div className="product-progress">
                                            任务进度
                                            <Progress percent={20}
                                                trailColor={"#E7E1E2"}
                                                strokeColor={"#FF4B4B"} />
                                        </div>
                                        <Descriptions size={'default'} column={3} className="des-box">
                                            <Descriptions.Item label="工单号">SCGD20220105006</Descriptions.Item>
                                            <Descriptions.Item label="实际起止时间">18:00 - 20:00</Descriptions.Item>
                                            <Descriptions.Item label="剩余时间">1小时10分钟</Descriptions.Item>
                                            <Descriptions.Item label="批次号">
                                                <Input placeholder="扫描批次号条码" allowClear className="batch-number" />
                                            </Descriptions.Item>
                                            <Descriptions.Item label="索证索票">标准土豆</Descriptions.Item>
                                            <Descriptions.Item label="索证索票附件"></Descriptions.Item>
                                            <Descriptions.Item label="检验数量">6</Descriptions.Item>
                                            <Descriptions.Item label="规格">吨</Descriptions.Item>
                                            <Descriptions.Item label="合格数量">8</Descriptions.Item>
                                            <Descriptions.Item label="不合格数量">
                                                <InputNumber min={1} className="unqualified-number" />
                                            </Descriptions.Item>
                                        </Descriptions>

                                        <div className="unqualified-list">
                                            <h4>选择不合格原因</h4>
                                            <Button className="active">尺寸不达标</Button>
                                            <Button>变质</Button>
                                            <Button>新鲜度不达标</Button>
                                            <Button>有泥土</Button>
                                            <Button>发芽</Button>
                                            <Button>发霉</Button>
                                            <Button>破损</Button>
                                            <Button>其他</Button>
                                        </div>

                                        <Button className="submit-btn" icon={<BarsOutlined />}>确定完成并提交</Button>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect()(Mine);
