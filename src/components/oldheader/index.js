import React, { Component } from 'react';
import { Popover } from 'antd';
import './header.less'

import ChangeLanguage from '../changeLanguage'

const Left = () => {
    return (
        <div className='head-left'>
            <p>成都天府智慧大厨房智能管控系统</p>
        </div>
    )
}

const Right = props => {
    const text = <span>消息通知</span>;
    const content = (
        <div>
            {props.infoList.map((item, index) => <p key={index}>{item}</p>)}
        </div>
    );
    return (
        <div className='head-right'>
            <ChangeLanguage />
            <p>{props.userName}</p>
            <Popover placement="bottom" title={text} content={content} trigger="click">
                <p className='click-btn'>消息({props.infoList.length})</p>
            </Popover>
            <p className='click-btn'>设置</p>
            <p className='click-btn'>退出</p>
        </div>
    )
}

class Head extends Component{
    constructor(props){
        super(props)
        this.state = {
            userName: '张三',
            infoList: ['消息1', '消息2', '消息3']
        }
    }
    // componentDidMount(){

    // }
    render(){
        return (
            <header className='head-box'>
                <Left />
                <Right userName={this.state.userName} infoList={this.state.infoList} />
            </header>
        )
    }
}

export default Head
