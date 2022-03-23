import React, { useState, useCallback } from 'react';
import ScreenContainer from '../../container/commonCreate';
import {
    Space,
    Table
} from 'antd';
import {
    FireOutlined
} from '@ant-design/icons';
import * as Echarts from 'echarts';
import './index.less';

function TableComponent({
    name, dataSource
}) {
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

export function ScreenPage() {
    const depleteMap = {
        electric: {
            name: '电能消耗',
            dataSource: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42
                },
                {
                    key: '3',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '4',
                    name: '胡彦祖',
                    age: 42
                }
            ]
        },
        water: {
            name: '水能消耗',
            dataSource: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42
                },
                {
                    key: '3',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '4',
                    name: '胡彦祖',
                    age: 42
                }
            ]
        },
        gas: {
            name: '燃气消耗',
            dataSource: [
                {
                    key: '1',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '2',
                    name: '胡彦祖',
                    age: 42
                },
                {
                    key: '3',
                    name: '胡彦斌',
                    age: 32
                },
                {
                    key: '4',
                    name: '胡彦祖',
                    age: 42
                }
            ]
        }
    };
    return (
        <div className='screen-container'>
            <div className='screent-content'>
                <div className='panel'>
                    {
                        Object.entries(depleteMap).map(([key, { name, dataSource }]) => (
                            <div className='card' key={key}>
                                <TableComponent name={name} dataSource={dataSource} />
                            </div>
                        ))
                    }
                </div>
                <div className='panel'>
                    <div className='card'>
                        <div className='floor floor1'>
                            <div>三层能耗</div>
                            <div className='dashboard'>
                                <div className='deplete electric'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>e&emsp;l&emsp;e&emsp;c&emsp;t&emsp;r&emsp;i&emsp;c</span>
                                </div>
                                <div className='deplete water'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>w&emsp;a&emsp;t&emsp;e&emsp;r</span>
                                </div>
                                <div className='deplete gas'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>g&emsp;a&emsp;s</span>
                                </div>
                            </div>
                        </div>
                        <div className='floor floor2'>
                            <div>二层能耗</div>
                            <div className='dashboard'>
                                <div className='deplete electric'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>e&emsp;l&emsp;e&emsp;c&emsp;t&emsp;r&emsp;i&emsp;c</span>
                                </div>
                                <div className='deplete water'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>w&emsp;a&emsp;t&emsp;e&emsp;r</span>
                                </div>
                                <div className='deplete gas'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>g&emsp;a&emsp;s</span>
                                </div>
                            </div>
                        </div>
                        <div className='floor floor3'>
                            <div>一层能耗</div>
                            <div className='dashboard'>
                                <div className='deplete electric'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>e&emsp;l&emsp;e&emsp;c&emsp;t&emsp;r&emsp;i&emsp;c</span>
                                </div>
                                <div className='deplete water'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>w&emsp;a&emsp;t&emsp;e&emsp;r</span>
                                </div>
                                <div className='deplete gas'>
                                    <div className='cell'>
                                        201
                                    </div>
                                    <span>g&emsp;a&emsp;s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='video'></div>
                        <div className='video'></div>
                        <div className='video'></div>
                    </div>
                </div>
                <div className='panel'>
                    {
                        Object.entries(depleteMap).map(([key, { name, dataSource }]) => (
                            <div className='card' key={key}>
                                <NormalLineChart name={name} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
