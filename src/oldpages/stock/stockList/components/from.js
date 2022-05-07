import React, { Component, useState } from "react";
import { Input, DatePicker, Button, Tag } from 'antd';
import {getMyDate} from "../../../../common";
import { searchContentAnd } from "../../../../utils/searchContentAnd";
const { CheckableTag } = Tag;

//头部查询栏
function StatusFun(props) {
    const [selectedTags, setSelectedTags] = useState(['全部']); //类型选择

    //类型切换
    const handleChange = (tag) => {
        setSelectedTags(tag)
        searchContentAnd(props.data, tag, props.setFilterArr)
    }

    return (
        <div className='creator-content bg-fff'>
            <div className='wrap-line'>
                <div className='tags-wrap'>
                    <div className='title'>选择仓库:</div>
                    <div>
                        {
                            props.stocks.map(item => (
                                <CheckableTag
                                    key={item.id}
                                    checked={selectedTags.indexOf(item.title) > -1}
                                    onChange={() => handleChange(item.title)}
                                >
                                    {item.title}
                                </CheckableTag>
                            ))
                        }
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
                    <div className='title'>保质期:</div>
                    <div className='flex'>
                        <Input className='field-input' style={{ width: '100px' }} />&nbsp;&nbsp;天以内
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
                <div className='tags-wrap'>
                    <div className='title'>快捷筛选:</div>
                    <div>
                        <Tag className='active'>只看库存不足</Tag>
                        <Tag className='active'>只看过期</Tag>
                    </div>
                </div>
            </div>
        </div>
    )
}

class From extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectWarehouse: '0',                      //选择仓库
            setTime: getMyDate(0),                     //设置时间
            qualityTime: "",                          //保质期
            supplier: "",                             //供货商
            quick: "",                                 //快捷筛选
        }
    }
    //点击确认提交数据
    search = () => {
        this.props.getParams(this.state)
    }
    //监听所有from数据变化，获取value
    onChange = (key, e, dateString) => {
        const obj = {}
        obj[key] = key === 'setTime' && dateString ? dateString : e.target.value
        this.setState(obj, () => {
            if (key === 'qualityTime' || key === 'supplier') return
            this.props.getParams(this.state)
        });
    }

    render() {
        return (
            <div className="distribution">
                <StatusFun stocks={this.props.stocks} data={this.props.data} setFilterArr={this.props.setFilterArr}/>
            </div>
        )
    }
}

export default From
