/* 质检追溯管理 */
import React, { Component } from "react";
import { Table, Space, Button, Modal, Input, Select, DatePicker   } from 'antd';
import moment from 'moment';
import '../quality.less'
const { Option } = Select;

class QualityReport extends Component{
	
	constructor(props){
		super(props)
	}
	
	state = {
	    modalVisible: false,
		inspectorDetail:{
			taskNumber: 'RW20220105001',  //任务编号
			testContent:'进货土豆品质检验',  //检验内容
			testType:'原材料检验', //检验类型
			testRequire: '进货土豆尺寸、外观检验',  //质检要求
			planStartTime: '2022/01/02 22:38:00',   //任务计划开始时间
			planEndTime: '2022/01/03 22:48:00',    //任务计划完成时间
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:1,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:1,  //是否超时 0:是  1:否
			QuantityNumber:'10吨',//检验数量
			QualifiedNumber:'9.8吨', //合格数量
			QuantityDetail:'',//质检详情
			inspectorList:[
				{
					inspectorId:'1',
					inspectorName:'张三'
				},
				{
					inspectorId:'2',
					inspectorName:'王五'
				}
			]
		},
		data: [
		  {
		    key: '1',
			id:'1',
		    taskNumber: 'RW20220105001',  //任务编号
			testContent:'进货土豆品质检验', //检验内容
			testType:'原材料检验', //检验类型
			testRequire: '进货土豆尺寸、外观检验', //质检要求
		    planStartTime: '2022/01/02 22:38:00', //任务计划开始时间
		    planEndTime: '2022/01/03 22:48:00',  //任务计划完成时间
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:0,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:0,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
		    inspector:'张三', //检验人
		  },
		  {
		    key: '2',
			id:'2',
			taskNumber: 'RW20220105001',
			testContent:'进货土豆品质检验',
			testType:'原材料检验',
			testRequire: '进货土豆尺寸、外观检验',
			planStartTime: '2022/01/02 22:38:00',
			planEndTime: '2022/01/03 22:48:00',
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:1,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:1,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
			inspector:'张三',
		  },
		  {
		    key: '3',
			taskNumber: 'RW20220105001',
			testContent:'进货土豆品质检验',
			testType:'原材料检验',
			testRequire: '进货土豆尺寸、外观检验',
			planStartTime: '2022/01/02 22:38:00',
			planEndTime: '2022/01/03 22:48:00',
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:2,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:0,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
			inspector:'张三',
		  },
		  {
		    key: '4',
			taskNumber: 'RW20220105001',
			testContent:'进货土豆品质检验',
			testType:'原材料检验',
			testRequire: '进货土豆尺寸、外观检验',
			planStartTime: '2022/01/02 22:38:00',
			planEndTime: '2022/01/03 22:48:00',
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:0,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:0,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
			inspector:'张三',
		  },
		  {
		    key: '5',
			taskNumber: 'RW20220105001',
			testContent:'进货土豆品质检验',
			testType:'原材料检验',
			testRequire: '进货土豆尺寸、外观检验',
			planStartTime: '2022/01/02 22:38:00',
			planEndTime: '2022/01/03 22:48:00',
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:0,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:0,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
			inspector:'张三',
		  },
		  {
		    key: '6',
			taskNumber: 'RW20220105001',
			testContent:'进货土豆品质检验',
			testType:'原材料检验',
			testRequire: '进货土豆尺寸、外观检验',
			planStartTime: '2022/01/02 22:38:00',
			planEndTime: '2022/01/03 22:48:00',
			executionStartTime:'2022/01/02 22:38:00', //任务执行开始时间
			executionEndTime:'2022/01/02 22:38:00', //任务执行结束时间
			executionStatus:0,  //执行状态 0:已完成 1：进行中  2：待执行
			isTimeout:0,  //是否超时 0:是  1:否
			QualifiedRate:'98.82%', //合格率
			inspector:'张三',
		  },
		 
		],
		columns : [
			{title: '任务编号',dataIndex: 'taskNumber',key: 'taskNumber',ellipsis:true,align:'center'},
			{title: '检验内容',dataIndex: 'testContent',key: 'testContent',ellipsis:true,align:'center'},
			{title: '检验类型',dataIndex: 'testType',key: 'testType',ellipsis:true,align:'center'},
			{title: '质检要求',key: 'testRequire',dataIndex: 'testRequire',ellipsis:true,align:'center'},
			{title: '任务计划开始时间',dataIndex: 'planStartTime',key: 'planStartTime',ellipsis:true,align:'center'},
			{title: '任务执行开始时间',key:'planEndTime',dataIndex: 'planEndTime',ellipsis:true,align:'center'},
			{title: '任务计划完成时间',key: 'executionStartTime',dataIndex: 'executionStartTime',ellipsis:true,align:'center'},
			{title: '任务执行结束时间',key: 'executionEndTime',dataIndex: 'executionEndTime',ellipsis:true,align:'center'},
			{title: '执行状态',key: 'executionStatus',dataIndex: 'executionStatus',ellipsis:true,align:'center',width:80,
				render:text =>{
					//执行状态 0:已完成 1：进行中  2：待执行
					let textVal = text === 0?'已完成':text === 1?'进行中':'待执行';
					return textVal
				}
			},
			{title: '是否超时',key: 'isTimeout',dataIndex: 'isTimeout',ellipsis:true,align:'center',width:80,
				render:text =>{
					//是否超时 0:是  1:否
					const textVal = text === 0?'是':'否';
					return textVal
				}
			},
			{title: '合格率',key: 'QualifiedRate',dataIndex: 'QualifiedRate',ellipsis:true,align:'center',width:80},
			{title: '检验人',key: 'inspector',dataIndex: 'inspector',align:'center'},
			{title: '操作',key: 'option',align:'center',width:80,
				render: (text, record) => (
				  <Space size="middle">
					<a  onClick={() => this.setModalVisible(true)}>查看</a>
				  </Space>
				),
			},
		],
		totalNum:0,// 表格total
		query: {
		  current:1,
		  pageSize:10,
		  testType: '0', //检验类型
		  qualityPlanTime:'',//质检计划时间
		  qualityPlanName:'0', //质检计划名称
		  carryStatus:'0',//执行状态
		  overTime:'0',//是否超时 1：是 0：否
		  taskContent: '', //任务编号或检验关键字
		}
	};
	
	componentDidMount(){
		this.getDataList(); //请求列表数据
	}

	// 获取列表数据
	getDataList = () => {
	    console.log(this.state.query,'')
	}
	
	//查询事件
	seachClick(){
		this.getDataList(); //请求接口
	}
	
	//重置事件
	resetClick(){
		let data = this.state.query;
		data.taskContent='';//任务编号或检验关键字
		data.testType='0'; //检验类型
		data.qualityPlanTime=null;//质检计划时间
		data.qualityPlanName='0'; //质检计划名称
		data.carryStatus='0';//执行状态
		data.overTime='0'; //是否超时 1：是 0：否
		this.setState({'query': data})
	}
	
	//显示隐藏任务详情
	setModalVisible(modalVisible) {
	    this.setState({ modalVisible });
	}
	
	//查询条件修改
	searchInfo = (dataType,event)=>{
		let data = this.state.query;
		data[dataType]=event;
		this.setState({'query': data})
	}
	
	//质检计划时间选择函数
	qualityPlanTime=(date, dateString)=> {
		let data = this.state.query;
		data.qualityPlanTime=dateString;
		this.setState({'query': data})
	}
	
    render(){
		const {query} = this.state;
        return (
           <div className="quality_List content">
                <header>
                    <div className="title">质检管理首页>第三方质检报告</div>
					<div className="searchEle" >
						<div className="flexCenterWrap flexCenter ">
							<div className="marginTRight marginTRight2">
								检验类型：
								 <Select value={query.testType}  style={{ width: 120 }} onChange={event=>this.searchInfo('testType',event)}>
								    <Option value="0">全部</Option>
								    <Option value="1">原材料检验</Option>
								    <Option value="2">成品检验</Option>
								 </Select>
							</div>
							<div className="marginTRight marginTRight2">
								质检计划时间：
								<DatePicker  value={query.qualityPlanTime?moment(query.qualityPlanTime):null} onChange={this.qualityPlanTime} />
							</div>
							<div className="marginTRight marginTRight2">
								质检计划名称：
								 <Select value={query.qualityPlanName} style={{ width: 120 }} onChange={event=>this.searchInfo('qualityPlanName',event)}>
								      <Option value="0">全部</Option>
								      <Option value="1">原材料检验</Option>
								      <Option value="2">成品眼见</Option>
								 </Select>
							</div>
							<div className="marginTRight marginTRight2">
								执行状态：
								 <Select value={query.carryStatus} style={{ width: 120 }} onChange={event=>this.searchInfo('carryStatus',event)}>
								      <Option value="0">全部</Option>
								      <Option value="1">已完成</Option>
								      <Option value="2">进行中</Option>
								      <Option value="3">待执行</Option>
								 </Select>
							</div>
							<div className="marginTRight marginTRight2">
								是否超时：
								 <Select value={query.overTime} style={{ width: 120 }}  onChange={event=>this.searchInfo('overTime',event)}>
								      <Option value="0">全部</Option>
								      <Option value="1">是</Option>
								      <Option value="2">否</Option>
								 </Select>
							</div>
							<div className="marginTRight marginTRight2">
								<Input value={query.taskContent} onChange={event=>this.searchInfo('taskContent',event.target.value)}  style={{'width':'250px'}} placeholder="请输入任务编号或检验内容关键字" />
							</div>
						</div>
						<div style={{textAlign:'right'}}>
							<Button type="primary" className="marginTRight" onClick={this.seachClick.bind(this)}>查询</Button>
							<Button type="primary" onClick={this.resetClick.bind(this)}>重置</Button>
						</div>
					</div>
                </header>
			  
			    <Table 
					size="small"
					bordered="true"
					columns={this.state.columns} 
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
								<div className="taskEle">执行状态：{this.state.inspectorDetail.executionStatus === 0?'已完成':this.state.inspectorDetail.executionStatus === 1?'进行中':'待执行'}</div>
								<div className="taskEle">是否超时：{this.state.inspectorDetail.isTimeout === 0?'是':'否'}</div>
							</div>
							<div className="flex">
								<div className="taskEle">任务编号：{this.state.inspectorDetail.taskNumber}</div>
								<div className="taskEle">检验类型：{this.state.inspectorDetail.testType}</div>
							</div>
							<div>检验内容：{this.state.inspectorDetail.testContent}</div>
							<div>质检要求：{this.state.inspectorDetail.testRequire}</div>
							<div className="flex">
								<div className="taskEle">任务计划开始时间：{this.state.inspectorDetail.planStartTime}</div>
								<div className="taskEle">任务计划结束时间：{this.state.inspectorDetail.planEndTime}</div>
							</div>
							<div className="flex">
								<div className="taskEle">任务执行开始时间：{this.state.inspectorDetail.executionStartTime}</div>
								<div className="taskEle">任务执行结束时间：{this.state.inspectorDetail.executionEndTime}</div>
							</div>
							<div>检验人：
								{
									this.state.inspectorDetail.inspectorList.map((item,index)=>{
										return (
											<span className="inspector" key={index}> {item.inspectorName}</span>
										)
									})
								}
							</div>
							<div className="flex">
								<div className="taskEle">检验数量：{this.state.inspectorDetail.QuantityNumber}</div>
								<div className="taskEle">合格数量：{this.state.inspectorDetail.QualifiedNumber}</div>
							</div>
							<div>
								质检详情：
								<div className="quantityDetail"></div>
							</div>
						</div>
					</div>
				</Modal>
           </div>
        )
    }
}

export default QualityReport