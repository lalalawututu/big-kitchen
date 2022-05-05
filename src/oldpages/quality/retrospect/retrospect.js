import { Table, Button, Input, Space, Modal, Descriptions, Select, DatePicker } from 'antd';
import retrospectContainer from "@/container/retrospect";
const { Option } = Select
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

//搜索内容
function SearchFun() {
	return (
		<div className='KillOpt'>
			<div className='flex marginRight marginBottom'>
				<div className='title'>检验类型:</div>
				<Select
					placeholder="请选择"
					allowClear
					className='field-select'
					dropdownClassName='field-select-dropdown'
					dropdownMatchSelectWidth={false}
				>
					<Option value="0">全部</Option>
					<Option value="1">原材料检验</Option>
					<Option value="2">成品检验</Option>
				</Select>
			</div>

			<div className='flex marginRight marginBottom'>
				<div className='title'>质检计划时间:</div>
				<DatePicker className='field-date' />
			</div>

			<div className='flex marginRight marginBottom'>
				<div className='title'>质检计划名称:</div>
				<Select
					placeholder="请选择"
					allowClear
					className='field-select'
					dropdownClassName='field-select-dropdown'
					dropdownMatchSelectWidth={false}
				>
					<Option value="0">全部</Option>
					<Option value="1">原材料检验</Option>
					<Option value="2">成品眼见</Option>
				</Select>
			</div>

			<div className='flex marginRight '>
				<div className='title'>执行状态:</div>
				<Select
					placeholder="请选择"
					allowClear
					className='field-select'
					dropdownClassName='field-select-dropdown'
					dropdownMatchSelectWidth={false}
				>
					<Option value="0">全部</Option>
					<Option value="1">已完成</Option>
					<Option value="2">进行中</Option>
					<Option value="3">待执行</Option>
				</Select>
			</div>

			<div className='flex marginRight'>
				<div className='title'>是否超时:</div>
				<Select
					placeholder="请选择"
					allowClear
					className='field-select'
					dropdownClassName='field-select-dropdown'
					dropdownMatchSelectWidth={false}
				>
					<Option value="0">全部</Option>
					<Option value="1">是</Option>
					<Option value="2">否</Option>
				</Select>
			</div>

			<div className='flex marginRight'>
				<Input className='field-input' placeholder="请输入任务编号或检验内容关键字" />
			</div>
			<Button type="primary" className='searchBtn'>查询</Button>
			<Button type="primary" className='searchBtn'>重置</Button>
		</div>
	)
}

//表格
function TableFun() {
	let retrospect = retrospectContainer.useContainer();
	const columns = [
		{ title: '任务编号', dataIndex: 'taskNumber', key: 'taskNumber', ellipsis: true, align: 'center' },
		{ title: '检验内容', dataIndex: 'testContent', key: 'testContent', ellipsis: true, align: 'center' },
		{ title: '检验类型', dataIndex: 'testType', key: 'testType', ellipsis: true, align: 'center' },
		{ title: '质检要求', key: 'testRequire', dataIndex: 'testRequire', ellipsis: true, align: 'center' },
		{ title: '任务计划开始时间', dataIndex: 'planStartTime', key: 'planStartTime', ellipsis: true, align: 'center' },
		{ title: '任务执行开始时间', key: 'planEndTime', dataIndex: 'planEndTime', ellipsis: true, align: 'center' },
		{ title: '任务计划完成时间', key: 'executionStartTime', dataIndex: 'executionStartTime', ellipsis: true, align: 'center' },
		{ title: '任务执行结束时间', key: 'executionEndTime', dataIndex: 'executionEndTime', ellipsis: true, align: 'center' },
		{
			title: '执行状态', key: 'executionStatus', dataIndex: 'executionStatus', ellipsis: true, align: 'center', width: 80,
			render: text => {
				//执行状态 0:已完成 1：进行中  2：待执行
				let textVal = text === 0 ? '已完成' : text === 1 ? '进行中' : '待执行';
				return textVal
			}
		},
		{
			title: '是否超时', key: 'isTimeout', dataIndex: 'isTimeout', ellipsis: true, align: 'center', width: 80,
			render: text => {
				//是否超时 0:是  1:否
				const textVal = text === 0 ? '是' : '否';
				return textVal
			}
		},
		{ title: '合格率', key: 'QualifiedRate', dataIndex: 'QualifiedRate', ellipsis: true, align: 'center', width: 80 },
		{ title: '检验人', key: 'inspector', dataIndex: 'inspector', align: 'center' },
		{
			title: '操作', key: 'option', align: 'center', width: 80,
			render: (text, record) => (
				<Space size="middle">
					<Button className="common-btn-bg" onClick={() => retrospect.setModalVisible(true)}>查看</Button>
				</Space>
			),
		},
	];

	return (
		<div className='common-long-table'>
			<Table
				rowKey={record => record.key}
				columns={columns}
				dataSource={retrospect.data}
			/>
		</div >
	)
}

//查看弹框
function ModalDetail() {
	let retrospect = retrospectContainer.useContainer();
	console.log(retrospect)
	return (
		<Modal
			className="container big-mask-container"
			title="质检任务详情"
			centered
			width="12.4rem"
			closable={false}
			visible={retrospect.modalVisible}
			onCancel={() => retrospect.setModalVisible(false)}
			footer={[
				<Button key="back" onClick={() => retrospect.setModalVisible(false)}>关闭</Button>
			]}
		>
			<div className='work-information big-container'>
				<div className="item item-line flex-between">
					<ul className="clearfix">
						<li>
							<span className="item-label">任务编号：</span>
							<span className="item-content">{retrospect.inspectorDetail.taskNumber}</span>
						</li>
						<li>
							<span className="item-label">检验类型：</span>
							<span className="item-content">{retrospect.inspectorDetail.testType}</span>
						</li>
					</ul>
					<div className="flex" style={{'marginBottom': '.28rem'}}>
						<span className="item-label">检验人：</span>
						<span className="item-content">
							张三
							<img className="headUrl" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.2qqtouxiang.com%2Fpic%2FTX8683_04.jpg&refer=http%3A%2F%2Fimg.2qqtouxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654346127&t=f8b4037941e4488398089e2864aaaa2d" alt=""/>

							{/* {
							retrospect.inspectorDetail.inspectorList.map((item, index) => {
								return (
									<span className="inspector" key={index}> {item.inspectorName}</span>
								)
							})
							} */}
						</span>
					</div>
				</div>

				<div className="item flex-between">
					<ul className="clearfix">
						<li>
							<span className="item-label">检验内容：</span>
							<span className="item-content">{retrospect.inspectorDetail.testContent}</span>
						</li>
						<li>
							<span className="item-label">质检要求：</span>
							<span className="item-content">{retrospect.inspectorDetail.testRequire}</span>
						</li>
					</ul>
					<div className="flex" style={{'marginBottom': '.28rem'}}>
						<span className="item-type">
							<b className="icon-type1"></b>
							{retrospect.inspectorDetail.executionStatus === 0 ? '已完成' : retrospect.inspectorDetail.executionStatus === 1 ? '进行中' : '待执行'}
						</span>
						<span className="item-type">
							<b className="icon-type2"></b>
							{retrospect.inspectorDetail.isTimeout === 0 ? '已超时' : '未超时'}
						</span>
					</div>
				</div>

				<div className="item">
					<ul className="clearfix">
						<li>
							<span className="item-label">任务执行开始时间：</span>
							<span className="item-content">{retrospect.inspectorDetail.planStartTime}</span>
						</li>
						<li>
							<span className="item-label">任务执行结束时间：</span>
							<span className="item-content">{retrospect.inspectorDetail.planEndTime}</span>
						</li>
					</ul>
					<ul className="clearfix">
						<li>
							<span className="item-label">任务执行开始时间：</span>
							<span className="item-content">{retrospect.inspectorDetail.executionStartTime}</span>
						</li>
						<li>
							<span className="item-label">任务执行结束时间：</span>
							<span className="item-content">{retrospect.inspectorDetail.executionEndTime}</span>
						</li>
					</ul>
				</div>

				<div className="item">
					<ul className="clearfix">
						<li>
							<span className="item-label">检验数量：</span>
							<span className="item-content">{retrospect.inspectorDetail.QuantityNumber}</span>
						</li>
						<li>
							<span className="item-label">合格数量：</span>
							<span className="item-content">{retrospect.inspectorDetail.QualifiedNumber}</span>
						</li>
					</ul>
				</div>

				<div className="item">
					<span className="item-label">质检详情：</span>
					<p className="textarea"></p>
				</div>
			</div>
		</Modal>
	)
}

export default function retrospect() {
	return (
		<div className='OzoneKill  container'>
			<retrospectContainer.Provider>
				<SearchFun />
				<TableFun />
				<ModalDetail />
			</retrospectContainer.Provider>
		</div >
	)
}
