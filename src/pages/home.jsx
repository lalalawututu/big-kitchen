import React, { Component } from "react";
import { Outlet } from 'react-router-dom'
import Header from '../components/oldheader';
import '../assets/css/index.less';

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: 'holle world!'
        }
    }


    // componentDidMount(){
    //     // console.log(document.querySelector('.title'))
    // }

    // componentWillReceiveProps(nextProps){
    //     // props更新时调用
    // }

    // componentWillUpdate(){
    //     //组件更新时调用
    // }

    // componentDidUpdate(){
    //     //组件更新完成后调用
    // }

    // componentWillUnmount(){
    //     //组件将要卸载时调用，一些事件监听和定时器在此时清楚
    // }

    render(){
        return (
            <>
                <Header ><title>Welcome</title></Header>
                <div style={{padding: '10px 20px'}}>
                    <Outlet />
                </div>
            </>
        )
    }
}

export default Home
