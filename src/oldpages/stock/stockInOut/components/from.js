import { Component } from "react";
import { Input, Radio, DatePicker, Button, Tag } from 'antd';
import moment from 'moment'
import { getMyDate } from '@/common/index'

const SelectCk = props => {
    return (
        <div className="from-lable">
            <p>选择仓库</p>
            <Radio.Group onChange={props.onChange} defaultValue="0">
                <Radio.Button value="0">全部</Radio.Button>
                <Radio.Button value="1">原料库</Radio.Button>
                <Radio.Button value="2">热加工库</Radio.Button>
                <Radio.Button value="3">调料包库</Radio.Button>
                <Radio.Button value="4">包材库</Radio.Button>
                <Radio.Button value="5">耗材库</Radio.Button>
                <Radio.Button value="6">调料库</Radio.Button>
                <Radio.Button value="7">周转筐</Radio.Button>
            </Radio.Group>
        </div>
    )
}

const SetTime = props => {
    function disabledDate(current) {
        return current > moment().endOf('day');
    }
    return (
        <div className="from-lable">
            <p>设置时间</p>
            <Radio.Group onChange={props.onChange} defaultValue={getMyDate(0)}>
                <Radio.Button value={getMyDate(0)}>今天</Radio.Button>
                <Radio.Button value={getMyDate(-1)}>昨天</Radio.Button>
            </Radio.Group>
            <DatePicker onChange={props.onChange} disabledDate={disabledDate} />
            {/* <Button style={{marginLeft: '10px'}} onClick={props.onClick} >确定</Button> */}
        </div>
    )
}

const Supplier = props => {
    return (
        <div className="from-lable">
            <p>原料/供货商</p>
            <Input style={{ width: '202px', marginRight: '10px' }} onChange={props.onChange} />
            <Button onClick={props.onClick} >确定</Button>
        </div>
    )
}

const Quick = props => {
    return (
        <div className="from-lable">
            <p>快捷筛选</p>
            <Radio.Group onChange={props.onChange} defaultValue="0">
                <Radio.Button value="0">全部</Radio.Button>
                <Radio.Button value="1">只看返库</Radio.Button>
                <Radio.Button value="2">只看入库</Radio.Button>
                <Radio.Button value="3">只看出库</Radio.Button>
                <Radio.Button value="4">只看延期</Radio.Button>
            </Radio.Group>
        </div>
    )
}

//头部查询栏
function StatusFun() {
    return (
        <div className='creator-content bg-fff'>
            <div className='wrap-line'>
                <div className='tags-wrap'>
                    <div className='title'>选择仓库:</div>
                    <div>
                        <Tag className='active'>全部</Tag>
                        <Tag className='active'>原料库</Tag>
                        <Tag className='active'>热加工库</Tag>
                        <Tag className='active'>调料包库</Tag>
                        <Tag className='active'>包材库</Tag>
                        <Tag className='active'>耗材库</Tag>
                        <Tag className='active'>调料库</Tag>
                        <Tag className='active'>周转筐</Tag>
                    </div>
                </div>
                <div className='tags-wrap'>
                    <div className='title'>设定时段:</div>
                    <div className='flex'>
                        <Tag className='active'>今天</Tag>
                        <Tag className='active'>昨天</Tag>
                        <Tag className='active'>近3天</Tag>
                        <Tag className='active'>近7天</Tag>
                        <Tag className='active'>近30天</Tag>
                        &nbsp;&nbsp;&nbsp;&nbsp;自选时间：
                        <DatePicker className='field-date' style={{ width: '200px' }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;-
                        <DatePicker className='field-date' style={{ width: '200px' }} />
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
                        <Tag className='active'>只看返库</Tag>
                        <Tag className='active'>只看入库</Tag>
                        <Tag className='active'>只看出库</Tag>
                        <Tag className='active'>只看延期</Tag>
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
            supplier: "",                             //供货商
            quick: "0",                                 //快捷筛选
        }
    }
    //点击确认提交数据
    search = () => {
        this.props.getParams(this.state)
    }
    //监听所有from数据变化，获取value
    onChange = (key, e, dateString) => {
        const obj = {}
        obj[key] = key == 'setTime' && dateString ? dateString : e.target.value
        this.setState(obj, () => {
            if (key == 'supplier') return
            this.props.getParams(this.state)
        });
    }

    render() {
        return (
            <div className="distribution">
                <StatusFun />
                {/* <SelectCk onChange={e => this.onChange('selectWarehouse', e)} />
                <SetTime onChange={(e, dateString) => this.onChange('setTime', e, dateString)} onClick={this.search} />
                <Supplier onChange={e => this.onChange('supplier', e)} onClick={this.search} />
                <Quick onChange={e => this.onChange('quick', e)} /> */}
            </div>
        )
    }
}

export default From