import React, { useState, useCallback } from 'react';
import { Space, Table } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import * as Echarts from 'echarts';
import './index.less';

function TableComponent({name, dataSource}) {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'left'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'right'
    }
  ];
  return (
      <Table
          showHeader={false}
          title={() => {
            return (
                <Space>
                  <FireOutlined />
                  <span>{name}</span>
                </Space>
            )
          }}
          size='small'
          dataSource={dataSource}
          columns={columns}
          pagination={false}
      />
  );
}

function NormalLineChart ({name}) {
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

function NormalBarChart() {
  const EchartEl = useCallback(node => {
    if (node !== null) {
      const Echart = Echarts.init(node);
      const option = {
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#94D8DF' }, // 设置颜色渐变
              { offset: 1, color: '#66C8D0' }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#EB70A1' },
              { offset: 1, color: '#EF8C6C' }
            ]
          },
        ],
        title: {
          text: '',
          left: 40,
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: [
          { left: 30, bottom: 20, top: 10, right: 30 }
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              color: '#FFFFFF', // 更改坐标轴文字颜色
            }
          },
        },
        yAxis: {
          type: 'value',
          interval: 50,
          splitLine:{
            show:true,
            lineStyle:{
              color:'#1F3149',
              width: 1
            }
          },
        },
        series: [
          {
            type: 'bar',
            data: [
              120,
              200,
              150,
              80,
              70,
              110,
              130
            ],
            //color: 'rgba(255, 255, 255, 0.1)'
          },
        ],
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

function NormalDashboardChart() {
  const EchartEl = useCallback(node => {
    if (node !== null) {
      const Echart = Echarts.init(node);
      const option = {
        title: {
          text: '',
          left: 40,
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: [
          { left: 30, bottom: 20, top: 10, right: 30 }
        ],
        series: [
          {
            type: 'gauge',
            startAngle: 180, //半圆
            endAngle: 0,
            splitNumber: 12,
            itemStyle: {
              color: '#58D9F9',
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            progress: {
              show: true,
              roundCap: true,
              width: 20,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 10
              }
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            title: {
              show: false
            },
            detail: {
              offsetCenter: [0, -50],
              formatter: function (value) {
                return '{value|' + value.toFixed(0) + '}{unit|条}';
              },
              rich: {
                value: {
                  fontSize: 30,
                  fontWeight: 'bolder',
                  color: '#fff'
                },
                unit: {
                  fontSize: 15,
                  color: '#fff',
                  padding: [0, 0, -10, 10]
                }
              }
            },
            data: [
              {
                value: 50,
                name:'名字'
              }
            ]
          }
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

const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '位置',
    dataIndex: 'address',
    key: 'address',
    align: 'center'
  },
  {
    title: '货品',
    dataIndex: 'goods',
    key: 'goods',
    align: 'center'
  },
  {
    title: '重量',
    dataIndex: 'weight',
    key: 'weight',
    align: 'center'
  },
  {
    title: '操作员',
    dataIndex: 'staff',
    key: 'staff',
    align: 'center'
  },
];
const columns1 = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '位置',
    dataIndex: 'address',
    key: 'address',
    align: 'center'
  },
  {
    title: '货品',
    dataIndex: 'goods',
    key: 'goods',
    align: 'center'
  },
  {
    title: '重量',
    dataIndex: 'weight',
    key: 'weight',
    align: 'center'
  },
  {
    title: '供应商',
    dataIndex: 'staff',
    key: 'staff',
    align: 'center'
  },
];
const data = [
  {
    key: '1',
    time: '10:35',
    address: '原料库',
    goods: '西虹市',
    weight: '23KG',
    staff: '郭郭',
  },
  {
    key: '2',
    time: '10:35',
    address: '原料库',
    goods: '西虹市',
    weight: '23KG',
    staff: '郭郭',
  },
  {
    key: '3',
    time: '10:35',
    address: '原料库',
    goods: '西虹市',
    weight: '23KG',
    staff: '郭郭',
  },
];


const columnsAlarm = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '货品',
    dataIndex: 'goods',
    key: 'goods',
    align: 'center'
  },
  {
    title: '信息',
    dataIndex: 'info',
    key: 'info',
    align: 'center'
  },
  {
    title: '质检员',
    dataIndex: 'staff',
    key: 'staff',
    align: 'center'
  },
];
const dataAlarm = [
  {
    key: '1',
    time: '10:35',
    goods: '土豆',
    info: '质检不合格',
    staff: '郭郭'
  },
];

export function LargeScreenPage() {
  return (
      <div className='screen-container'>
        <div className='screen-content'>
          <div className='panel'>
            <div className='card-table'>
              <h1 className="logo-container">
                <img src={require('../../style/img/header/headerpicture.png')} alt="" />
                成都天府智慧大厨房智能管控
              </h1>

              <div className="table">
                <Table
                    title={() => {
                      return (
                          <Space className="screen-title">
                            <span className="cyan"><b className="icon-return"></b>返库记录</span>
                          </Space>
                      )
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size='small' />
              </div>

              <div className="table">
                <Table
                    title={() => {
                      return (
                          <Space className="screen-title">
                            <span className="blue">
                              <b className="icon-supplier"></b>供应商信息</span>
                          </Space>
                      )
                    }}
                    columns={columns1}
                    dataSource={data}
                    pagination={false}
                    size='small' />
              </div>
            </div>
          </div>

          <div className='panel panel-padding'>
            <div className="panel-second">
              <div className='card'>
                <Space className="screen-title">
                  <span><b className="icon-monitor"></b>实时监控</span>
                </Space>
                <div className="img-list clearfix">
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                  <img src="http://www.ipe.org.cn/IndustryRecord/images/icon-co2.png" alt=""/>
                </div>
              </div>
              <div className="panel-updown">
                <div className='card card-pink'>
                  <Table
                      title={() => {
                        return (
                            <Space className="screen-title">
                              <span><b className="icon-alarm"></b>报警信息</span>
                            </Space>
                        )
                      }}
                      columns={columnsAlarm}
                      dataSource={dataAlarm}
                      pagination={false}
                      size='small' />
                </div>
                <div className='card card-blue'>
                  <Space className="screen-title">
                    <span><b className="icon-location"></b>库位信息</span>
                    <b className="icon-tips"></b>
                  </Space>
                  <NormalBarChart />
                </div>
              </div>
            </div>

            <div className='card card-marquee'>
              <marquee behavior="scroll" direction="left" align="middle">
                <p>11:23 小李 入库 西红柿 0.23吨</p>
                <p>11:23 小李 入库 西红柿 0.23吨</p>
                <p>11:23 小李 入库 西红柿 0.23吨</p>
                <p>11:23 小李 入库 西红柿 0.23吨</p>
                <p>11:23 小李 入库 西红柿 0.23吨</p>
              </marquee>
            </div>

            <div className="panel-second">
              <div className='card'>
                <Space className="screen-title">
                  <span><b className="icon-safe"></b>安全库存风险区</span>
                </Space>
                <NormalBarChart />
                <div className="chart-mask">
                  <b className="icon-important"></b>
                  洋葱 土豆 西红柿 胡萝卜
                </div>
              </div>

              <div className='card'>
                <Space className="screen-title">
                  <span><b className="icon-temporary"></b>临期库存风险区</span>
                </Space>
                <div className="temporary-container">
                  <div className="temporary-chart">
                    <NormalDashboardChart />
                    <div className="chart-mask">
                      <b className="icon-important"></b>
                      洋葱 土豆 西红柿 胡萝卜
                    </div>
                  </div>

                  <ul className="temporary-list">
                    <li className="">
                      <div className="number">
                          <img className="bg" src={require('../../style/img/screen/icon-circle-orange.png')} alt=""/>
                          <span>1</span>
                      </div>
                      <div className="type-list flex-between">
                        <h6>原料库</h6>
                        <p>洋葱 土豆 西红柿 胡萝卜</p>
                      </div>
                    </li>
                    <li className="">
                      <div className="number">
                        <img className="bg" src={require('../../style/img/screen/icon-circle-pink.png')} alt=""/>
                        <span>2</span>
                      </div>
                      <div className="type-list flex-between">
                        <h6>调料库</h6>
                        <p>酱油 胡椒</p>
                      </div>
                    </li>
                    <li className="">
                      <div className="number">
                        <img className="bg" src={require('../../style/img/screen/icon-circle-blue.png')} alt=""/>
                        <span>1</span>
                      </div>
                      <div className="type-list flex-between">
                        <h6>包材库</h6>
                        <p>标准饭盒</p>
                      </div>
                    </li>
                    <li className="">
                      <div className="number">
                        <img className="bg" src={require('../../style/img/screen/icon-circle-grey.png')} alt=""/>
                        <span>0</span>
                      </div>
                      <div className="type-list flex-between">
                        <h6>其它库</h6>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
