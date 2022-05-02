import React, { Component } from "react";
import Head from './components/qualityHead';
import Content from './components/qualityContent';
import TodayPlan from './components/qualityTodayPlan'
import './qualityIndex.less';

class Stock extends Component{
    render(){
        return (
            <div className="quality-content">
                <Head />
                <TodayPlan />
                <Content />
            </div>
        )
    }
}

export default Stock