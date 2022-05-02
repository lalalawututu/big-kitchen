import { useState, useEffect } from 'react'
import { Table, Button, Input, Space, Modal, Descriptions, Tag, Select, DatePicker } from 'antd';
import DistributionContainer from '@/container/distribution';
import { useNavigate } from "react-router-dom";
import * as echarts from 'echarts'
import 'echarts/lib/chart/pie';// 引入饼状图
import './index.less'

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
        <div id={"quality-chartDom" + props.lineIndex} style={{width: 300, height: 200}}/>
    )
}

//饼图
function PieChart() {
    //运单状态
    const WaybillList = {
        data: [
            { value: '23', name: '未生产' },
            { value: '19', name: '待配送' },
            { value: '35', name: '配送中' },
            { value: '47', name: '已传达' },
        ],
        legend: ['未生产', '待配送', '配送中', '已传达']
    }

    //车辆状态
    const VehicleList = {
        data: [
            { value: '19', name: '未开始' },
            { value: '35', name: '运行中' },
        ]
    }

    //延误状态
    const DelayList = {
        data: [
            { value: '19', name: '正常' },
            { value: '35', name: '延误' },
        ]
    }

    return (
        <div className='creator-content bg-fff flex' style={{ justifyContent: 'space-around' }}>
            <div><ChartDom lineIndex={1} list={WaybillList} /></div>
            <div><ChartDom lineIndex={2} list={VehicleList} /></div>
            <div><ChartDom lineIndex={3} list={DelayList} /></div>
        </div>
    )
}

//状态栏
function StatusFun() {
    return (
        <div className='creator-content bg-fff'>
            {/* <Title className='content-title' level={4}>板块标题</Title> */}
            <div className='wrap-line'>
                <div className='tags-wrap'>
                    <div className='title'>运单状态:</div>
                    <div>
                        <Tag className='active'>全部</Tag>
                        <Tag className='active'>已完成</Tag>
                        <Tag className='active'>配送中</Tag>
                        <Tag className='active'>未开始</Tag>
                        <Tag className='active'>待配送</Tag>
                    </div>
                </div>
                <div className='tags-wrap'>
                    <div className='title'>车辆状态:</div>
                    <div>
                        <Tag className='active'>全部</Tag>
                        <Tag className='active'>运行中</Tag>
                        <Tag className='active'>未行使</Tag>
                    </div>
                </div>
                <div className='tags-wrap'>
                    <div className='title'>延误状态:</div>
                    <div>
                        <Tag className='active'>全部</Tag>
                        <Tag className='active'>正常</Tag>
                        <Tag className='active'>延误</Tag>
                    </div>
                </div>
                <div className='tags-wrap'>
                    <div className='title'>设定时段:</div>
                    <div className='flex'>
                        <Tag className='active'>今天</Tag>
                        <Tag className='active'>昨天</Tag>
                        <DatePicker className='field-date' />
                        <Button type="primary" className='btn'>确定</Button>
                    </div>
                </div>
                <div className='tags-wrap'>
                    <div className='title'>原料/供货商:</div>
                    <div className='flex'>
                        <Input className='field-input' />
                        <Button type="primary" className='btn'>确定</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//表格
function TableFun() {
    const navigate = useNavigate();
    let distribution = DistributionContainer.useContainer();

    const columns = [
        { title: '运单号', dataIndex: 'WaybillNo', key: 'WaybillNo', ellipsis: true, align: 'center' },
        { title: '客户名称', dataIndex: 'CustomerName', key: 'CustomerName', ellipsis: true, align: 'center' },
        { title: '车牌号', dataIndex: 'CarNumber', key: 'CarNumber', ellipsis: true, align: 'center' },
        { title: '重量', dataIndex: 'weight', key: 'weight', ellipsis: true, align: 'center', sorter: (a, b) => a.weight - b.weight },
        { title: '数量', dataIndex: 'quantity', key: 'quantity', ellipsis: true, align: 'center', sorter: (a, b) => a.quantity - b.quantity },
        { title: '运单状态', dataIndex: 'WaybillStatus', key: 'WaybillStatus', ellipsis: true, align: 'center', sorter: (a, b) => a.WaybillStatus - b.WaybillStatus },
        { title: '车辆状态', dataIndex: 'VehicleStatus', key: 'VehicleStatus', ellipsis: true, align: 'center', sorter: (a, b) => a.VehicleStatus - b.VehicleStatus },
        {
            title: '操作', key: 'option', align: 'center', width: 120,
            render: (text, record) => (
                <Space size="middle">
                    <Button className="common-btn-bg" onClick={() => navigate('/DistributionDetail')}>查看</Button>
                </Space>
            )
        },
    ]

    return (
        <div className='common-long-table'>
            <Table
                rowKey={record => record.key}
                columns={columns}
                dataSource={distribution.data}
            />
        </div >
    )
}

export default function index() {
    return (
        <div className='distribution container'>
            <PieChart />
            <StatusFun />
            <TableFun />
        </div >
    )
}
