import SwipeCardContainer from '../../container/swipeCard'
import {Table, Button, Space, Col, Row} from 'antd'
import {Link} from "react-router-dom";
import React, {useCallback} from "react";
import * as Echarts from "echarts";
import './index.less'

function NormalGaugeChart() {
    const EchartEl = useCallback(node => {
        if (node !== null) {
            const Echart = Echarts.init(node);
            const option = {
                // backgroundColor: {
                //     type: 'linear',
                //     x: 0,
                //     y: 0,
                //     x2: 1,
                //     y2: 1,
                //     colorStops: [{
                //         offset: 0, color: '#FAFBFC' // 0% 处的颜色
                //     }, {
                //         offset: 1, color: '#DFE0EB' // 100% 处的颜色
                //     }],
                //     global: false // 缺省为 false
                // },
                series: [
                    {
                        name: 'hour',
                        type: 'gauge',
                        radius: '95%',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 12,
                        splitNumber: 12,
                        clockwise: true,
                        axisLine: {
                            lineStyle: {
                                width: 0, //15
                                color: [
                                    [0.1,'#FAFBFC'],
                                    [1, '#DFE0EB']
                                ],
                                shadowColor: '#9188C0',
                                shadowBlur: 20,
                                opacity: 0.5
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#9188C0',
                                opacity: 0.3
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#9188C0',
                                cap: 'round',
                                // shadowColor: 'rgba(145,136,192, 0.3)',
                                // shadowBlur: 3,
                                // shadowOffsetX: 1,
                                // shadowOffsetY: 2
                            }
                        },
                        axisLabel: {
                            fontSize: 14,
                            distance: 5,
                            color: '#000',
                            formatter: function (value) {
                                if (value === 0) {
                                    return '';
                                }
                                return value + '';
                            }
                        },
                        anchor: { show: false },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 4,
                            length: '60%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#2C2D2F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: [0, '30%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    },
                    {
                        name: 'minute',
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 60,
                        clockwise: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 2,
                            length: '90%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#2C2D2F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        anchor: {
                            show: true,
                            size: 10,
                            showAbove: false,
                            itemStyle: {
                                borderWidth: 10,
                                borderColor: '#2C2D2F',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: ['0%', '-40%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    },
                    {
                        name: 'second',
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        min: 0,
                        max: 60,
                        animationEasingUpdate: 'bounceOut',
                        clockwise: true,
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                            width: 2,
                            length: '99%',
                            offsetCenter: [0, '8%'],
                            itemStyle: {
                                color: '#F1400A',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        anchor: {
                            show: true,
                            size: 10,
                            showAbove: true,
                            itemStyle: {
                                color: '#F1400A',
                                shadowColor: 'rgba(0, 0, 0, 0.3)',
                                shadowBlur: 8,
                                shadowOffsetX: 2,
                                shadowOffsetY: 4
                            }
                        },
                        detail: {
                            show: false
                        },
                        title: {
                            offsetCenter: ['0%', '-40%']
                        },
                        data: [
                            {
                                value: 0
                            }
                        ]
                    }
                ]
            };
            setInterval(function () {
                var date = new Date();
                var second = date.getSeconds();
                var minute = date.getMinutes() + second / 60;
                var hour = (date.getHours() % 12) + minute / 60;
                option.animationDurationUpdate = 300;
                Echart.setOption({
                    series: [
                        {
                            name: 'hour',
                            animation: hour !== 0,
                            data: [{ value: hour }]
                        },
                        {
                            name: 'minute',
                            animation: minute !== 0,
                            data: [{ value: minute }]
                        },
                        {
                            animation: second !== 0,
                            name: 'second',
                            data: [{ value: second }]
                        }
                    ]
                });

            }, 1000);
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

export const SwipeCardPage = () => {
  return (
    <div className="container swipe-card-container">
        <div className="flex-between" style={{height: '100%'}}>
            <div className="swipe-card-box">
                <div className="left">
                    <div className="logo-container">
                        <Link to="/">
                            <img src={require('../../style/img/header/headerpicture.png')} alt="" className='logo' />
                        </Link>
                        成都天府智慧大厨房智能管控
                    </div>
                    <div className="ch">
                        <p>Welcome</p>
                        <p>感谢您的辛苦付出</p>
                        <p>请刷卡</p>
                    </div>
                </div>
                <div className="en">
                    <p><strong>Tianfu Smart</strong>kitchen</p>
                    <p>Thank you for your hard work</p>
                </div>
            </div>
            <div className="swipe-card-box" style={{alignItems: 'flex-end'}}>
                <div className="ets">
                    <NormalGaugeChart />
                    <p className="date-time">2022年02月19日</p>
                </div>
                <div className="card-area">
                    <img src={require('../../style/img/header/headerpicture.png')} alt="" className='card' />
                </div>
            </div>
        </div>
    </div>
  )
}
