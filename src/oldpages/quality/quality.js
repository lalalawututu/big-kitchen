/* 质检计划列表 */
import React, { Component } from "react";
import { Table, Tag, Space, Button, message, Breadcrumb, Modal, Pagination  } from 'antd';
import { Router, Route } from 'react-router'
import {Link, useHistory } from 'react-router-dom'
import './quality.less'
import request from '@/net/api.js'


class quality extends Component{

	constructor(props) {
		super(props)
	}

	state = {
		columns:[
			{title: '计划名称',dataIndex: 'PlanName',key: 'PlanName',align:'center'},
			{title: '计划开始时间',dataIndex: 'PlanStartTime',key: 'PlanStartTime',align:'center'},
			{title: '计划完成时间',dataIndex: 'PlanEndTime',key: 'PlanEndTime',align:'center'},
			{title: '任务数量',key: 'PlanNum',dataIndex: 'PlanNum',align:'center'},
			{title: '状态',dataIndex: 'PlanState',key: 'PlanState',align:'center',
				render: text =>{
					//text 1:已审核 0：待审核
					const stateText = text == 1? '已审核':'待审核';
					let colorFont = text == 1?'#7E7E7E':'#333333';
					return( <span style={{color:colorFont}}>{stateText}</span>)
				}
			},{
				title: '操作',
				key: 'option',
				align:'center',
				render: (text, record) => {
					let withdrawBtn; //撤回按钮的展示
					//已撤回
					if(!record.PlanState){
						withdrawBtn = <a className="color7E">撤回</a>
					}else{
						withdrawBtn = <a onClick = {this.withdraw.bind(this,record)}>撤回</a>
					}
					return (
						<Space size="middle">
							<Link to={record.PlanState?"":"/QualityApprove?id="+record.Id}><span className={record.PlanState?'color7E':''}>审核</span></Link>
							{withdrawBtn}
							<Link to="/QualityDetail">查看</Link>
						</Space>
					)
				},
			}],
		selectedRowKeys: [], // 表格默认选中的列id集合
		selectedRows:[], //选择的数据
		current: 1, //当前页码
		totalNum: 0,//总页数
		query: {
			current:1, //当前页码
			pageSize:10, //每页显示的条数
		},
	}

	//审批通过
	Approved(){
		var id=this.state.selectedRowKeys;
		if(id.length==0){
			message.warning('请选择要操作的数据');
		}else{
			let selectedRowsList = this.state.selectedRows;
			for(var i=0;i<selectedRowsList.length;i++){
				if(selectedRowsList[i].PlanState != 0){
					message.warning('请选择要操作正确的数据');
					return false;
				}
			}

			//审批通过接口
			let ids={'id':id.join()}
			request.quality.qualityApprovalAll(ids).then((res)=>{
				console.log(res,'批量审批')
			})
		}
	}

	//批量撤回
	BatchWithdrawal(){
		var id=this.state.selectedRowKeys;
		if(id.length==0){
			message.warning('请选择要操作的数据');
		}else{
			let selectedRowsList = this.state.selectedRows;
			for(var i=0;i<selectedRowsList.length;i++){
				if(selectedRowsList[i].PlanState == 0){
					message.warning('请选择要操作正确的数据');
					return false;
				}
			}

			//审批通过接口
			let ids={'id':id.join()}
			request.quality.qualityWithdrawAll(ids).then((res)=>{
				console.log(res,'批量撤回')
			})
		}
	}

	//撤回事件
	withdraw(res){
		const modal = Modal.confirm();
			modal.update({
			title:'撤回确认',
			content:`${res.PlanName}仅可在${res.PlanStartTime}之前进行撤回操作。确定要撤回${res.PlanName}吗？`,
			okText:'撤回',
			onCancel(){},
			onOk:()=>{
				let ids={id:res.Id};
				request.quality.qualityWithdraw(ids).then((res)=>{
					console.log(res,'撤回')
				})
			}
		})
	}

	//表格多选选中事件
	onSelectChange = (selectedRowKeys,selectedRows) => {
		console.log(selectedRowKeys,'onSelectChange',selectedRows,'selectedRows')
		this.setState({ selectedRowKeys,selectedRows });
	};

	//请求数据
	componentDidMount(){
		this.getPlanList();//获取质检计划列表数据
	}

	//获取质检计划列表数据
	getPlanList = ()=>{
		request.quality.getPlanList(this.state.query).then((res)=>{
			if(res.data.Total){
				this.setState({
					data:res.data.List, //列表数据
					totalNum:res.data.Total //页面总条数
				})
			}
		})
	}

    render(){
		const { selectedRowKeys } = this.state;
		const rowSelection = {
		  selectedRowKeys,
		  onChange: this.onSelectChange,
		};

        return (
            <div className="quality_List content">
                <div className="title">
					质检管理首页>质检计划列表
				</div>

                <div className="optbtn">
                    <Button type="primary" onClick={this.Approved.bind(this)}>批量审批通过</Button>
                    <Button type="primary" onClick={this.BatchWithdrawal.bind(this)}>批量撤回</Button>
                </div>

			    <Table
					size="small"
					bordered={true}
					rowSelection={rowSelection}
					columns={this.state.columns}
					rowKey={record => record.Id}
					dataSource={this.state.data}
					pagination={{//根据ant中pagination组件可以添加相应的参数,此处只简单进行处理
						showSizeChanger: true,
						showQuickJumper: true,
						onChange: (index, size) => {
							let data = this.state.query;
							data.current=index;
							data.pageSize=size;
							this.setState({
								query:data
							})
						},
						current: this.state.query.current,
						pageSize: this.state.query.pageSize,
						showTotal: () => <span>共 {this.state.totalNum} 条记录</span>
					}}
				/>

            </div>
        )
    }
}

export default quality
