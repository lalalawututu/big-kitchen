import React, { Component } from 'react';
import CollapseHeader from './collapseHeader'
import { Collapse } from 'react-bootstrap';
import { Table, Pagination } from 'antd';
import tabColumns from './tabColumns'


class Content extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [{Id: 1}, {Id: 2}],
            columns: [], //  表头
            tabList: [], //  列表数据
            page: {
                current: 1,
                pageSize: 10,
            },
            total: 100,
        }
    }

    componentDidMount(){
        this.setState({columns: tabColumns.columns1})
        this.getData()
    }

    //页面初始化加载基础数据
    getData = async () => {
        // const data = await request.stock.getStockIndex()
        // console.log(data1.Stocks)
        // if(!data.Stocks.length) return
        // this.setState({data})
    }

    // 获取列表数据
    getTabData = async (planId, tabName) => {
        let flag = false
        this.state.data.forEach(res => {
            if(res.Id == planId && res.collapseOpen) flag = true
        })
        if(!flag) return   //只有点击展开的库才会请求更新列表数据

        console.log(planId, tabName)
    }

    //分页跳转
    onShowSizeChange = (current, pageSize) => {
        this.setState({
            page: {
                current,
                pageSize
            }
        }, () => {
            this.getData()
        })
    }

    //折叠面板开关
    open = (key, planId) => {
        let arrobj = JSON.parse(JSON.stringify(this.state.data))
        arrobj[key].collapseOpen = !arrobj[key].collapseOpen
        arrobj.forEach((item, index) => {
            if(key !== index) item.collapseOpen = false
        })
        this.setState({data: arrobj}, () => {
            this.getTabData(planId, '任务完成率')
        })
    }

    render() {
        const element = this.state.data.map((item, index) => {
            return (
                <div key={item.Id} style={{marginBottom: '20px'}}>
                    <div className='collapseHeader-title' onClick={() => this.open(index, item.Id)}>质检计划名称</div>
                    <CollapseHeader data={item} myIndex={index} onClick={(planId, tabName) => this.getTabData(planId, tabName)} />
                    <Collapse in={item.collapseOpen}>
                        <div>
                            <Table columns={this.state.columns} dataSource={this.state.tabList} pagination={false} bordered size="small"/>
                            <div className="page-box">
                                <Pagination showQuickJumper showSizeChanger defaultCurrent={1} total={this.state.total} showTotal={total => `共 ${total} 条`} onShowSizeChange={this.onShowSizeChange} />
                            </div>
                        </div>
                    </Collapse>
                </div>
            )
        })
        return (
            <>
                {element}
            </>
        )
    }
}

export default Content
