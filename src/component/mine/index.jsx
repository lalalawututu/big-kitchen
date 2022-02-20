import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Space, Button, Progress, Collapse, Descriptions, Input, InputNumber } from 'antd';
import { PoweroffOutlined, ContainerFilled, LeftCircleOutlined, BarsOutlined } from '@ant-design/icons';
import './index.less';
import { actionCreatorsMine } from './store';

const { Panel } = Collapse;
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
);

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
);

// 留样头部
const genExtraly = (item) => (
    <Descriptions layout="vertical" size={'default'} column={5} className="des-box">
        <Descriptions.Item label="任务名称">{JSON.parse(item).TaskName || ''}</Descriptions.Item>
        <Descriptions.Item label="批次号">{JSON.parse(item).BatchNumber || ''}</Descriptions.Item>
        <Descriptions.Item label="留样产线">{JSON.parse(item).Station || ''}</Descriptions.Item>
        <Descriptions.Item label="存放位置">{JSON.parse(item).StorageLocation || ''}</Descriptions.Item>
        <Descriptions.Item label="状态">{JSON.parse(item).TaskStatus || ''}</Descriptions.Item>
    </Descriptions>
);

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
);

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
);


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
);

function callback(key) {
    console.log(key);
}



class Mine extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            btnDisabled: false, //任务是否开始
            time: '', //当前时间
            peopleInfo: [], // 人员基本信息
            ReceivingTaskList: [], //接货
            WarehousingTaskList: [], //入库
            PickingTaskList: [], //领料
            ProductTaskList: [], //生产
            SampleRetentionTaskList: [],// 留样
            PackingTaskList: [], //包装
            QualityInspectionTaskList: [], //质检
        }
    }
    componentDidMount() {
        let myDate = new Date();
        let Year = myDate.getFullYear();
        let Month = myDate.getMonth() + 1;
        let date = myDate.getDate();
        let h = myDate.getHours();       //获取当前小时数(0-23)
        let m = myDate.getMinutes();     //获取当前分钟数(0-59)
        let s = myDate.getSeconds();
        let timeStr = `${Year}/${Month}/${date} ${h}:${m}:${s}`

        this.setState({ time: timeStr })

        //面板请求数据
        fetch('GetTaskList').then(async (response) => {
            if (response.ok) {
                let res = await response.json();

                res.data.List.ReceivingTaskList.map((item, index) => {
                    item.btn = { 'content': '接货开始', flag: 0 }
                })
                res.data.List.WarehousingTaskList.map((item, index) => {
                    item.btn = { 'content': '入库开始', flag: 0 }
                })
                res.data.List.PickingTaskList.map((item, index) => {
                    item.btn = { 'content': '领料开始', flag: 0 }
                })
                res.data.List.ProductTaskList.map((item, index) => {
                    item.btn = { 'content': '生产开始', flag: 0 }
                })
                res.data.List.SampleRetentionTaskList.map((item, index) => {
                    item.btn = { 'content': '留样开始', flag: 0 }
                })
                res.data.List.LoadingTaskList.map((item, index) => {
                    item.btn = { 'content': '配送开始', flag: 0 }
                })
                res.data.List.QualityInspectionTaskList.map((item, index) => {
                    item.btn = { 'content': '质检开始', flag: 0 }
                })
                res.data.List.LoadingTaskList.map((item, index) => {
                    item.btn = { 'content': '配送开始', flag: 0 }
                })
                res.data.List.PackingTaskList.map((item, index) => {
                    item.btn = { 'content': '包装开始', flag: 0 }
                })


                this.setState({
                    'ReceivingTaskList': res.data.List.ReceivingTaskList || [], //接货
                    'WarehousingTaskList': res.data.List.WarehousingTaskList || [], //入库
                    'PickingTaskList': res.data.List.PickingTaskList || [], //领料
                    'QualityInspectionTaskList': res.data.List.QualityInspectionTaskList || [],  //质检
                    'ProductTaskList': res.data.List.ProductTaskList || [], //生产
                    'SampleRetentionTaskList': res.data.List.SampleRetentionTaskList || [], //留样
                    'PackingTaskList': res.data.List.PackingTaskList || [], //包装
                    'LoadingTaskList': res.data.List.LoadingTaskList || [], //配送
                })
                console.log(this.state, '666')

            }
        });

        this.GetEmployee(); //获取人员基本信息

    }
    //获取人员基本信息
    GetEmployee = () => {
        fetch('GetEmployee/YG_01010001').then(async (response) => {
            if (response.ok) {
                let res = await response.json();
                this.setState({
                    'peopleInfo': res.Employee || [], //接货
                })
                console.log(this.state)
            }
        });
    }

    getNow = (s) => {
        return s < 10 ? '0' + s : s;
    }

    //计算剩余时间
    residueTime = (PlanStartTime, PlanEndTime, ActualStartTime) => {
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
        var now = year + '/' + this.getNow(month) + "/" + this.getNow(date) + " " + this.getNow(h) + ':' + this.getNow(m) + ":" + this.getNow(s);

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
    residueTime2 = (StartTime, EndTime)=>{
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
            return (days ?  this.getNow(days) + ':' : '') + (hours ?  this.getNow(hours) + ':' : '00') + (minutes ? this.getNow(minutes)  : '00')
        } else {
            return ''
        }

    }

    //修改不合格数量-质检
    UnqualifiedNumber = (e, item, index) => {
        const QualityInspectionTaskList = [...this.state.QualityInspectionTaskList];
        this.setState({
            QualityInspectionTaskList: QualityInspectionTaskList.map((item, i) =>
                i === index ? { ...item, UnqualifiedNumber: e } : item
            ),
        })
    }

    //任务提交事件
    TaskStartClick = (item, index, flag) => {
        const ReceivingTaskList = [...this.state.ReceivingTaskList];  //接货
        const WarehousingTaskList = [...this.state.WarehousingTaskList]; //入库
        const PickingTaskList = [...this.state.PickingTaskList]; //领料
        const ProductTaskList = [...this.state.ProductTaskList]; //生产
        const SampleRetentionTaskList = [...this.state.SampleRetentionTaskList] ;//留样
        const PackingTaskList = [...this.state.PackingTaskList]; //包装
        const QualityInspectionTaskList = [...this.state.QualityInspectionTaskList]; //质检
        const LoadingTaskList = [...this.state.LoadingTaskList]; //配送

        var TaskType = '';
        if (flag == 1) {
            TaskType = '接货任务'
        } else if (flag == 2) {
            TaskType = '入库任务'
        } else if (flag == 3) {
            TaskType = '领料任务'
        } else if(flag==4){
            TaskType = '生产任务'
        } else if(flag == 5){
            TaskType = '留样任务'
        } else if(flag == 6){
            TaskType ='包装任务'
        } else if(flag == 7){
            TaskType ='质检任务'
        } else if(flag == 8){
            TaskType = '配送任务'
        }

        // this.setState({'btnDisabled':true})
        //各类型按钮开始
        if (item.btn.flag == 0) {
            var postData = { 'TaskId': item.TaskId, 'TaskType': TaskType }
            fetch('TaskStart', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(postData)
            }).then(async (response) => {
                if (response.ok) {
                    let res = await response.json();
                    //接货任务
                    if (flag == '1') {
                        this.setState({
                            ReceivingTaskList: ReceivingTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '接货结束', flag: 1 } } : item
                            ),
                        })
                    }

                    //入库任务
                    if (flag == '2') {
                        this.setState({
                            WarehousingTaskList: WarehousingTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '入库结束', flag: 1 } } : item
                            ),
                        })
                    }

                    //领料任务
                    if (flag == '3') {
                        this.setState({
                            PickingTaskList: PickingTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '领料结束', flag: 1 } } : item
                            ),
                        })
                    }

                    //生产任务
                      if (flag == '4') {
                        this.setState({
                            ProductTaskList: ProductTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '生产结束', flag: 1 } } : item
                            ),
                        })
                    }

                    //留样任务
                    if (flag == '5') {
                        this.setState({
                            SampleRetentionTaskList: SampleRetentionTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '确定留样', flag: 1 } } : item
                            ),
                        })
                    }

                    //包装任务
                    if (flag == '6') {
                        this.setState({
                            PackingTaskList: PackingTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '确定并提交', flag: 1 } } : item
                            ),
                        })
                    }

                    //质检任务
                    if (flag == '7') {
                        this.setState({
                            QualityInspectionTaskList: QualityInspectionTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '确定并提交', flag: 1 } } : item
                            ),
                        })
                    }

                     //配送任务
                     if (flag == '8') {
                        this.setState({
                            LoadingTaskList: LoadingTaskList.map((item, i) =>
                                i === index ? { ...item, btn: { content: '完成配送', flag: 1 } } : item
                            ),
                        })
                    }

                }
            });
        }
        //各类型按钮结束
        if (item.btn.flag == 1) {
            //接货任务
            if (flag == 1) {
                var data = { 'TaskId': item.TaskId }
                fetch('ReceivingTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

            //入库
            if (flag == '2') {
                fetch('WarehousingTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

            //领料
            if (flag == '3') {
                fetch('PickingTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

             //生产
             if (flag == '4') {
                fetch('ProductTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

             //留样
             if (flag == '5') {
                fetch('SampleRetentionTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

             //包装
             if (flag == '6') {
                fetch('PackingTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

            //质检
            if (flag == '7') {
                fetch('QualityInspectionTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId,'UnqualifiedNumber':item.UnqualifiedNumber })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }

            //配送
            if (flag == '8') {
                fetch('LoadingTaskSubmit', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ 'TaskId': item.TaskId })
                }).then(async (response) => {
                    let res = await response.json();
                })
            }
        }
    }

    render() {
        const { peopleInfo, ReceivingTaskList, WarehousingTaskList, PickingTaskList, PackingTaskList, SampleRetentionTaskList, QualityInspectionTaskList, ProductTaskList, LoadingTaskList } = this.state;
        return (
            <div className="bulletin-board-container">
                <Row>
                    <Col span={6} className="bulletin-board-left">
                        <div className="employee-info">
                            <div className="date">{this.state.time.split(' ')[0]}<span>{this.state.time.split(' ')[1]}</span></div>
                            <Space align="start">
                                <img className="header-url" src="https://avatars.githubusercontent.com/u/22983816?s=40&v=4" alt="" />
                                <div className="data">
                                    <h6>{peopleInfo.Name || ''}</h6>
                                    <p>{peopleInfo.EmployeeId || ''}</p>
                                </div>
                            </Space>
                            <div className="btn">
                                <Button className="leave-btn"><b className="icon-leave"></b>请假</Button>
                                <Button className="quit-btn"><PoweroffOutlined />退出</Button>
                            </div>
                        </div>
                        <div className="work-progress">
                            <h3 className="commit-title"><b className="icon-progress"></b> 工作进度</h3>
                            <Progress percent={20}
                                trailColor={"#F7F7FF"}
                                strokeColor={{
                                    '0%': '#7071DB',
                                    '100%': '#6364D9',
                                }} />
                        </div>
                        <div className="news-container">
                            <img src={require('../../style/img/icon/news.png')} />
                        </div>
                    </Col>
                    <Col span={18} className="bulletin-board-right">
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
                                {/* 接货 */}
                                {
                                    ReceivingTaskList && ReceivingTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={index + 1} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20 + index}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际起止时间">
                                                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : ''}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                                                        <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" disabled={this.state.btnDisabled} onClick={() => { this.TaskStartClick(item, index, 1) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 入库 */}
                                {
                                    WarehousingTaskList && WarehousingTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId+'11'} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20 + index}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际起止时间">
                                                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : ''}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                                                        <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" disabled={this.state.btnDisabled} onClick={(e) => { this.TaskStartClick(item, index, 2) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 领料 */}
                                {
                                    PickingTaskList && PickingTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtra(`${JSON.stringify(item)}`)} key={item.TaskId+'2'} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20 + index}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际起止时间">
                                                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际接货重量">{item.ActualWeighing ? item.ActualWeighing + item.Unit : ''}</Descriptions.Item>
                                                        <Descriptions.Item label="完成比例">{((item.ActualWeighing / item.Weight).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" disabled={this.state.btnDisabled} onClick={(e) => { this.TaskStartClick(item, index, 3) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 生产 */}
                                {
                                    ProductTaskList && ProductTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtrasc(`${JSON.stringify(item)}`)} key={item.TaskId+'3'} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId}</Descriptions.Item>
                                                        <Descriptions.Item label="实际起止时间">
                                                            {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">{item.BatchNumber}</Descriptions.Item>
                                                        <Descriptions.Item label="产成品">{item.Produce}</Descriptions.Item>
                                                        <Descriptions.Item label="执行人">{item.EmployeeName}</Descriptions.Item>
                                                        <Descriptions.Item label="实际完成">{item.CompletedQuantity + item.Unit}</Descriptions.Item>
                                                        <Descriptions.Item label="完成比例">{((item.CompletedQuantity / item.Quantity).toFixed(2)) * 100 + '%'}</Descriptions.Item>
                                                    </Descriptions>

                                                    {<Button className="submit-btn" onClick={() => { this.TaskStartClick(item, index, 4) }} icon={<BarsOutlined />}>{item.btn.content}</Button> }
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 留样 */}
                                {
                                    SampleRetentionTaskList && SampleRetentionTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtraly(`${JSON.stringify(item)}`)} key={item.TaskId+'5'} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="计划时间">
                                                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="实际时间">
                                                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="留样内容要求">{item.TaskContent || ''}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" onClick={(e) => { this.TaskStartClick(item, index, 5) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 装箱（包装） */}
                                {
                                    PackingTaskList && PackingTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtrabz(`${JSON.stringify(item)}`)} key={item.TaskId} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="计划开始时间">{item.PlanStartTime?item.PlanStartTime.split(' ')[1]:'--'}</Descriptions.Item>
                                                        <Descriptions.Item label="计划结束时间">{item.PlanEndTime?item.PlanEndTime.split(' ')[1]:'--'}</Descriptions.Item>
                                                        <Descriptions.Item label="计划用时">{this.residueTime2(item.PlanStartTime, item.PlanEndTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="实际开始时间">{item.ActualStartTime?item.ActualStartTime.split(' ')[1]:'--'}</Descriptions.Item>
                                                        <Descriptions.Item label="计划结束时间">{item.ActualEndTime?item.ActualEndTime.split(' ')[1]:'--'}</Descriptions.Item>
                                                        <Descriptions.Item label="实际用时">{this.residueTime2(item.ActualStartTime, item.ActualEndTime)}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" onClick={() => { this.TaskStartClick(item, index, 6) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }


                                {/* 质检 */}
                                {
                                    QualityInspectionTaskList && QualityInspectionTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtrazj(`${JSON.stringify(item)}`)} key={item.TaskId} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId}</Descriptions.Item>
                                                        <Descriptions.Item label="开始时间">{item.ActualStartTime ? item.ActualStartTime.split(' ')[1] : ''}</Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">
                                                            <Input placeholder="扫描批次号条码" value={item.BatchNumber} allowClear className="batch-number" />
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="索证索票">{item.TicketInspection}</Descriptions.Item>
                                                        <Descriptions.Item label="索证索票附件">{item.AnnexName}</Descriptions.Item>
                                                        <Descriptions.Item label="检验数量">{item.InspectionQuantity}</Descriptions.Item>
                                                        <Descriptions.Item label="规格">{item.Unit}</Descriptions.Item>
                                                        <Descriptions.Item label="合格数量">{item.InspectionQuantity - item.UnqualifiedNumber}</Descriptions.Item>
                                                        <Descriptions.Item label="不合格数量">
                                                            <InputNumber min={0} max={item.InspectionQuantity} defaultValue={item.UnqualifiedNumber}
                                                                onChange={e => this.UnqualifiedNumber(e, item, index)} className="unqualified-number" />
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

                                                    <Button className="submit-btn" onClick={() => { this.TaskStartClick(item, index, 7) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
                                                </div>
                                            </Panel>
                                        )
                                    })
                                }

                                {/* 配送 */}
                                {
                                    LoadingTaskList && LoadingTaskList.map((item, index) => {
                                        return (
                                            <Panel header="" extra={genExtraps(`${JSON.stringify(item)}`)} key={item.TaskId+'88'} showArrow={false}>
                                                <div className="product-info">
                                                    <div className="product-progress">
                                                        任务进度
                                                        <Progress percent={20 + index}
                                                            trailColor={"#E7E1E2"}
                                                            strokeColor={"#FF4B4B"} />
                                                    </div>
                                                    <Descriptions size={'default'} column={3} className="des-box">
                                                        <Descriptions.Item label="工单号">{item.TaskId || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际起止时间">
                                                        {item.ActualStartTime ? item.ActualStartTime.split(' ')[1] + ' - ' : '- -- '}{item.ActualEndTime ? item.ActualEndTime.split(' ')[1] : '--'}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="剩余时间">{this.residueTime(item.PlanStartTime, item.PlanEndTime, item.ActualStartTime)}</Descriptions.Item>
                                                        <Descriptions.Item label="批次号">{item.BatchNumber || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="客户名称">{item.CustomerName || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="客户地址">{item.CustomerAddress || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="物流公司">{item.CompanyName || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="配送员">{item.EmployeeName || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="配送员ID">{item.EmployeeId || ''}</Descriptions.Item>
                                                        <Descriptions.Item label="实际出货">{item.Quantity + item.Specifications}</Descriptions.Item>
                                                        <Descriptions.Item label="完成比例">{item.BatchNumber || ''}</Descriptions.Item>
                                                    </Descriptions>

                                                    <Button className="submit-btn" disabled={this.state.btnDisabled} onClick={() => { this.TaskStartClick( item, index, 8) }} icon={<BarsOutlined />}>{item.btn.content}</Button>
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
        );
    }
}

export default connect()(Mine);
