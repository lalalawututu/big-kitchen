/* 质检计划审批列表 */
import React, { Component } from "react";
import { Table, Tag, Space, Button, Modal, Input, Select   } from 'antd';
import './quality.less'
import request from '@/net/api.js'
const { Option } = Select;

class Approve extends Component{
	
	constructor(props){
		super(props)
	}
	
	state = {
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
				<a  onClick={() => this.setModalVisible(true,record)}>修改检验人</a>
		      </Space>
		    ),
		  },
		],
		peopleData: [
		  {
		    key: '1',
		    staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		  {
		    key: '2',
			staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		  {
		    key: '3',
			staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		  {
		    key: '4',
			staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		  {
		    key: '5',
			staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		  {
		    key: '6',
			staffNumber: 'lvhaoxuan',
			staffName:'吕昊轩',
			staffDepartment:'生产部',
			staffPost: '技术工人',
		  },
		 
		],
		peopleColumns : [
		  {
		    title: '员工编号',
		    dataIndex: 'staffNumber',
		    key: 'staffNumber',
		  },
		  {
		    title: '姓名',
		    dataIndex: 'staffName',
		    key: 'staffName',
		  },
		  {
		    title: '所属部门',
		    dataIndex: 'staffDepartment',
		    key: 'staffDepartment',
		  },
		  {
		    title: '岗位',
		    key: 'staffPost',
		    dataIndex: 'staffPost',
		  },
		],
		inspectorDetail:'',
		selectedRtowKeys: [], // 表格默认选中的列
		inspecorData:[], // 选择人员选中的值
		modalVisible: false,
		modalInspector: false,
		query: {
			id:1,
			current:1,
			pageSize:10,
			testType: '0', //检验类型
			taskContent: '', //任务编号或检验关键字
		},
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
	
	
	//选择人员表格多选选中事件
	onSelectChange = (selectedRowKeys,data) => {
		this.setState({ selectedRowKeys });
		var str=[];
		data.forEach(item=>{
			var obj={};
			obj.StaffName=item.staffName;
			obj.Id = item.Id
			str.push(obj)
		})
		this.setState({
			inspectorData:str
		})
	};
	
	//选择人员确定函数
	inspectorConfim(){
		this.state.inspectorData.forEach(item=>{
			this.state.inspectorDetail.Inspector=[...this.state.inspectorDetail.Inspector,item]
		})
		this.setMhanceInspector(false)
	}
	
	//修改送检人取消弹框函数
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
	
	//选择检验人取消弹框函数
	setMhanceInspector(modalInspector) {
		this.setState({
			modalInspector,
			inspectorData:[], //清空数据
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
	
	//审核通过
	examinePass = () =>{
		let ids=[1,2,3,4]
		var data={id:ids.join()}
		const modal = Modal.confirm();
			modal.update({
			title:'审核确认',
			content:'审核确认后，各任务将自动按时发送给相应的员工。确定要审核通过吗？',
			onCancel(){},
			onOk:()=>{
				request.quality.getQualityApprovePass(data).then((res)=>{
					console.log('审核通过按钮',res)
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
		const {query} = this.state;
		
        return (
           <div className="quality_List content">
                <header>
                    <div className="title">质检计划列表：</div>
					<div className="flexCenter searchEle">
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
                        <Button type="primary" onClick={this.examinePass}>审核通过</Button>
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
					  title="修改检验人"
					  centered
					  width = "600px"
					  okText="确认" 
					  cancelText="取消"
					  visible={this.state.modalVisible}
					  onOk={() => this.setModalVisible(false)}
					  onCancel={() => this.setModalVisible(false)}
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
							<div>检验人</div>
							<div className="inspectorChance flex">
								{
									this.state.inspectorDetail.Inspector&&this.state.inspectorDetail.Inspector.map((item,index)=>{
										return (
											<div className="inspector" key={index}>{item.StaffName}</div>
										)
									})
								}
								<div className="inspectorOpt" onClick={() => this.setMhanceInspector(true)}>+</div>
							</div>
						</div>
					</div>
				</Modal>
			
				<Modal
					  title="选择人员"
					  width='700px'
					  okText="确认"
					  cancelText="取消"
					  visible={this.state.modalInspector}
					  onOk={this.inspectorConfim.bind(this)}
					  onCancel={() => this.setMhanceInspector(false)}
					>
					<div className="flexCenter" style={{'justifyContent':'space-between','marginBottom':'24px'}}>
						<div><Input  placeholder="关键字查询" /></div>
						<Button type="primary">查询</Button>
					</div>
					<Table
						size="small"
						rowSelection={rowSelection}
					 	columns={this.state.peopleColumns} 
					 	dataSource={this.state.peopleData} 
					/>
				</Modal>
           </div>
        )
    }
}

export default Approve