/* 质检计划列表 */
import React, { Component } from "react";
import { Table, Tag, Space, Button, Modal, Input, Select   } from 'antd';
import request from '@/net/api.js'
import './quality.less'

const { Option } = Select;

class Detail extends Component{
	
	constructor(props){
		super(props)
	}
	
	state = {
	    modalVisible: false,
		inspectorDetail:'', //查看内容
		approveList:[],//质检审批列表数据
		columns : [
		  { title: '任务编号', dataIndex: 'TaskNumber', key: 'TaskNumber'},
		  { title: '检验内容', dataIndex: 'TestContent', key: 'TestContent'},
		  { title: '检验类型', dataIndex: 'TestType', key: 'TestType'},
		  { title: '质检要求', key: 'TestRequire', dataIndex: 'TestRequire'},
		  { title: '任务计划开始时间', dataIndex: 'PlanStartTime', key: 'PlanStartTime'},
		  { title: '任务计划完成时间',  dataIndex: 'PlanEndTime', key: 'PlanEndTime'},
		  { title: '检验人',  dataIndex: 'Inspector', key: 'Inspector'},
		  {
		    title: '操作',
		    key: 'option',
		    render: (text, record) => (
		      <Space size="middle">
				<a  onClick={() => this.setModalVisible(true,record)}>查看</a>
		      </Space>
		    ),
		  },
		],
		query: {
			id:1,
			current:1,
			pageSize:10,
			testType: '0', //检验类型
			taskContent: '', //任务编号或检验关键字
		}
	};
	
	//请求数据
	componentDidMount(){
		this.getApproveList();//获取质检计划审批列表数据
	}
	
	//质检计划审批列表
	getApproveList = ()=>{
		request.quality.getDetailList(this.state.query).then((res)=>{
			if(res.data.Total){
				this.setState({
					approveList:res.data.List, //列表数据
					totalNum:res.data.Total //页面总条数
				})
			}
		})
	}
	
	//查询条件修改
	searchInfo = (dataType,event)=>{
		let data = this.state.query;
		data[dataType]=event;
		this.setState({'query': data})
	}
	
	//查询事件
	seachClick(){
		this.getApproveList(); //请求接口
		console.log(this.state)
	}
	
	//重置事件
	resetClick(){
		let data = this.state.query;
		data.taskContent='';//任务编号或检验关键字
		data.testType='0'; //检验类型
		this.setState({'query': data})
		this.getApproveList(); //请求接口
	}
	
	//显示隐藏任务详情
	setModalVisible(modalVisible,record) {
		//修改检验人信息
		if(record){
			request.quality.getInspectorInfo({id:record.Id}).then((res)=>{
				if(res && res.data){
					let {inspectorDetail} = this.state;
					inspectorDetail=res.data
					this.setState({inspectorDetail})
				}
			})
		}
	    this.setState({ modalVisible });
	}
	
	//导出Excel
	exportExcel = () =>{
		let ids=[1,2,3,4]
		var data={id:ids.join()}
		request.quality.getQualityListExcel(data).then((res)=>{
			console.log('导出',res)
		})
	}
	
    render(){
		const {query} = this.state;
        return (
           <div className="quality_List content">
                <header>
                    <div className="title">质检计划列表：</div>
					<div className="flexCenter searchEle" >
						<div className="flexCenter ">
							<div className="marginTRight">
								 检验类型：
								  <Select value={query.testType}  style={{ width: 120 }} onChange={event=>this.searchInfo('testType',event)}>
								     <Option value="0">全部</Option>
								     <Option value="1">原材料检验</Option>
								     <Option value="2">成品检验</Option>
								  </Select>
							</div>
							<div><Input value={query.taskContent} onChange={event=>this.searchInfo('taskContent',event.target.value)}  style={{'width':'250px'}} placeholder="请输入任务编号或检验内容关键字" /></div>
						</div>
						<div>
							<Button type="primary" className="marginTRight" onClick={this.seachClick.bind(this)}>查询</Button>
							<Button type="primary" onClick={this.resetClick.bind(this)}>重置</Button>
						</div>
					</div>
                    <div className="optbtn">
                        <Button type="primary" onClick={this.exportExcel}>导出Excel</Button>
                    </div>
                </header>
			  
			    <Table
			    	size="small"
			    	columns={this.state.columns} 
			    	dataSource={this.state.approveList}
			    	rowKey={record => record.Id}
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
				
				<Modal
					  title="质检任务详情"
					  centered
					  width = "600px"
					  visible={this.state.modalVisible}
					  onCancel={() => this.setModalVisible(false)}
					  footer={[
						  <Button key="back" onClick={() => this.setModalVisible(false)}>关闭</Button>
					  ]}
					>
					<div className="quality_List">
						<div className="editInspector">
							<div className="flex">
								<div className="taskEle">任务编号：{this.state.inspectorDetail.TaskNumber}</div>
								<div className="taskEle">检验类型：{this.state.inspectorDetail.TestType}</div>
							</div>
							<div>检验内容：{this.state.inspectorDetail.TestContent}</div>
							<div>质检要求：{this.state.inspectorDetail.TestRequire}</div>
							<div className="flex">
								<div className="taskEle">任务计划开始时间：{this.state.inspectorDetail.PlanStartTime}</div>
								<div className="taskEle">任务计划结束时间：{this.state.inspectorDetail.PlanEndTime}</div>
							</div>
							<div>
								检验人：
								{
									this.state.inspectorDetail.Inspector&&this.state.inspectorDetail.Inspector.map((item,index)=>{
										return (
											<span className="inspector" style={{marginRight:'10px'}} key={index}>{item.StaffName}</span>
										)
									})
								}
							</div>
						</div>
					</div>
				</Modal>
           </div>
        )
    }
}

export default Detail