import React, { useState, useCallback } from 'react';
import { Space, Table } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import * as Echarts from 'echarts';
import './index.less';

function TableComponent() {
  const columns = [
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '订单号', dataIndex: 'number', key: 'time' },
    { title: '地址', dataIndex: 'address', key: 'address', align: 'left' },
    { title: '状态', dataIndex: 'type', key: 'type', render: text => <a>{text}</a>, },
  ];
  const dataSource = [
    { key: '1', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '2', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '3', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '4', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '5', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '5', time: '10:35', number: 'AJ100891', address: '成都市政府食堂', type: '已送达'},
    { key: '5', time: '10:35', number: 'AJ100891', address: '成都市政府', type: '已送达'},
  ];
  return (
      <div className="table-box">
        <Table
            showHeader={false}
            size='small'
            dataSource={dataSource}
            columns={columns}
            pagination={false}
        />
      </div>
  );
}

function NormalLineChart ({
  name
}) {
const EchartEl = useCallback(node => {
if (node !== null) {
const Echart = Echarts.init(node);
const option = {
title: {
text: name,
left: 40,
textStyle: {
color: '#fff',
fontWeight: 'normal',
fontSize: 14
}
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
},
yAxis: {
type: 'value',
show: false
},
series: [
{
data: [300, 300, 300, 300, 300, 300, 300],
type: 'bar',
color: 'rgba(255, 255, 255, 0.1)'
},
{
data: [150, 230, 224, 218, 135, 147, 260],
type: 'line',
smooth: true
},
{
data: [100, 200, 224, 160, 135, 244, 260],
type: 'line',
smooth: true
}
],
tooltip: {
trigger: 'axis',
axisPointer: {
type: 'cross'
}
},
grid: [
{ left: 10, bottom: 20, top: 40, right: 10 }
]
};
Echart.setOption(option);
Echart.resize({ height: node.offsetHeight, width: node.offsetWidth });
}
}, [])

return (
<div
ref={EchartEl}
style={{
height: '90%',
width: '100%'
}}
/>
);
}



export function ScreenLogisticsPage() {
  return (
      <div className='screen-container'>
        <div className='screen-content-topbtm'>
          <div className='flex-box'>
            <div className="box">
              <div className="card"></div>
              <div className="card card-bg">
                <TableComponent />
              </div>
            </div>
            <div className="box">
              <img className="city-bg" src={require("../../style/img/screen/city.png")} alt=""/>
            </div>
            <div className="box">
              <div className="card card-bg">

              </div>
              <div className="card">
                <TableComponent />
              </div>
            </div>
          </div>
          <div className='flex-box'>
            <div className="img-list">
              <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
              <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
              <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
              <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
              <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
  )
}
