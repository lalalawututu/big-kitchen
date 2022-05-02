import { useState, useEffect } from 'react'
import { Table, Tag, DatePicker, Button, Input } from 'antd';
import TurnoverBasket from '@/container/TurnoverBasket'
import * as echarts from 'echarts'
import 'echarts/lib/chart/pie';// 引入饼状图

function ChartDom(props) {
    let [main, setMain] = useState('')
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            right: '0%',
            y: 'center',  //图例上下居中
            data: props.list ? props.list.legend : [],
            formatter: function (name) {
                var data = props.list.data
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (name === data[i].name) {
                            return name + '  ' + data[i].value
                        }
                    }
                }
                return name;
            },
        },
        series: [{
            type: 'pie',
            radius: '80%',
            center: ['35%', '50%'], //图的位置，距离左跟上的位置
            data: props.list ? props.list.data : [],
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

    if (main !== "") {
        main.setOption(option);
        window.onresize = main.resize;
    }

    useEffect(() => {
        let myChart = echarts.init(document.getElementById("quality-chartDom" + props.lineIndex));
        setMain(myChart)
    }, [])

    return (
        <div id={"quality-chartDom" + props.lineIndex} style={{ width: 300, height: 200 }}></div>
    )
}

//饼图
function PieChart() {
    const List = {
        data: [
            { value: '19', name: '待回筐' },
            { value: '35', name: '坏筐' },
            { value: '47', name: '回筐' },
        ],
        legend: ['待回筐', '坏筐', '回筐']
    }

    return (
        <div className='distribution creator-content bg-fff '>
            <div className='wrap-line'>
                <div className='tags-wrap'>
                    <div className='title'>设定时段:</div>
                    <div className='flex'>
                        <Tag className='active'>今天</Tag>
                        <Tag className='active'>昨天</Tag>
                        <DatePicker className='field-date' />
                        <Button type="primary" className='btn'>确定</Button>
                    </div>
                </div>

            </div>
            <div><ChartDom lineIndex={1} list={List} /></div>
        </div>
    )
}

//表格
function TableFun() {
    let turnover = TurnoverBasket.useContainer();
    const columns = [
        { title: '时间', dataIndex: 'Time', key: 'Time', ellipsis: true, align: 'center' },
        { title: '回筐数量', dataIndex: 'ReturnNumber', key: 'ReturnNumber', ellipsis: true, align: 'center' },
        { title: '坏筐数量', dataIndex: 'BadNumber', key: 'BadNumber', ellipsis: true, align: 'center' },
        { title: '操作人', dataIndex: 'Operator', key: 'Operator', ellipsis: true, align: 'center' },
    ]

    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.MaterialId}
                columns={columns}
                dataSource={turnover.data}
            />
        </div>
    )
}

export default function Index() {
    return (
        <div className='materialIndex container'>
            <PieChart />
            <TableFun />
        </div >
    )
}
