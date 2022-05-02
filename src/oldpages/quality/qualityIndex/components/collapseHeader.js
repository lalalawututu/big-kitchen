import React, { useState, Component } from 'react';
import { Progress } from 'antd';
// 引入 ECharts 主模块
import * as echarts from 'echarts'
// 引入饼状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

//进度条
const ProgressComponent = props => {
    let [num, setNum] = useState(0)
    setTimeout(() => {
        setNum(props.num)
    }, 500);
    return (
        <Progress
            className='my-progress'
            strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
            }}
            percent={num}
            showInfo={false}
        />
    )
}

//echarts饼状图
class ChartDom extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
       let myChart = echarts.init(document.getElementById("quality-chartDom" + this.props.myIndex));
       let option = {
            tooltip: {
                trigger: 'item'
            },
            series: [{
                type: 'pie',
                radius: '80%',
                data: [
                    { value: 2, name: '不合格率' },
                    { value: 98, name: '合格率' },
                ],
                labelLine: {
                    show: false
                },
                label: {
                    show: false,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }
    render(){
        return(
            <div id={"quality-chartDom" + this.props.myIndex} style={{ width: 100, height: 100 }}></div>
        )
    }
}

const CollapseHeader = props => {
    return (
        <div className='collapseHeader'>
            <ul className='collapseHeader-content'>
                <li style={{width:'29%'}} onClick={() => props.onClick(props.data.Id, '任务完成率')}>
                    <div>
                        <p className='header-title'>任务完成率</p>
                        <p><span className='data-num'>50</span>%</p>
                    </div>
                    <div>
                        <span>任务完成数：25个</span>
                        <ProgressComponent num={50} />
                        <span>任务总数：50个</span>
                        <ProgressComponent num={100} />
                    </div>
                </li>
                <li style={{width:'29%'}}  onClick={() => props.onClick(props.data.Id, '质检平均合格率')}>
                    <div>
                        <p className='header-title'>质检平均合格率</p>
                        <p><span className='data-num'>98</span>%</p>
                    </div>
                    <div>
                        <ChartDom myIndex={props.myIndex} />
                    </div>
                </li>
                <li style={{width:'14%'}}  onClick={() => props.onClick(props.data.Id, '进行中任务')}>
                    <div>
                        <p className='header-title'>进行中任务</p>
                        <p><span className='data-num'>30</span>个</p>
                    </div>
                </li>
                <li  style={{width:'14%'}} onClick={() => props.onClick(props.data.Id, '待执行任务')}>
                    <div>
                        <p className='header-title'>待执行任务</p>
                        <p><span className='data-num'>25</span>个</p>
                    </div>
                </li>
                <li  style={{width:'14%'}} onClick={() => props.onClick(props.data.Id, '超时任务')}>
                    <div>
                        <p className='header-title'>超时任务</p>
                        <p><span className='data-num'>2</span>个</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default CollapseHeader