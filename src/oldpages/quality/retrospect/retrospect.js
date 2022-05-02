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
			className="add-mask"
			title="质检任务详情"
			centered
			width="800px"
			visible={retrospect.modalVisible}
			onCancel={() => retrospect.setModalVisible(false)}
			footer={[
				<Button key="back" onClick={() => retrospect.setModalVisible(false)}>关闭</Button>
			]}
		>
			<div className='work-information'>
				<Descriptions size={'default'} column={2} className="descriptions-basic">
					<Descriptions.Item label="执行状态">{retrospect.inspectorDetail.executionStatus === 0 ? '已完成' : retrospect.inspectorDetail.executionStatus === 1 ? '进行中' : '待执行'}</Descriptions.Item>
					<Descriptions.Item label="是否超时">{retrospect.inspectorDetail.isTimeout === 0 ? '是' : '否'}</Descriptions.Item>
					<Descriptions.Item label="任务编号">{retrospect.inspectorDetail.taskNumber}</Descriptions.Item>
					<Descriptions.Item label="检验类型">{retrospect.inspectorDetail.testType}</Descriptions.Item>
				</Descriptions>
				<Descriptions size={'default'} column={1} className="descriptions-basic">
					<Descriptions.Item label="检验内容">{retrospect.inspectorDetail.testContent}</Descriptions.Item>
					<Descriptions.Item label="质检要求">{retrospect.inspectorDetail.testRequire}</Descriptions.Item>
				</Descriptions>
				<Descriptions size={'default'} column={2} className="descriptions-basic">
					<Descriptions.Item label="任务执行开始时间">{retrospect.inspectorDetail.planStartTime}</Descriptions.Item>
					<Descriptions.Item label="任务执行结束时间">{retrospect.inspectorDetail.planEndTime}</Descriptions.Item>
					<Descriptions.Item label="任务执行开始时间">{retrospect.inspectorDetail.executionStartTime}</Descriptions.Item>
					<Descriptions.Item label="任务执行结束时间">{retrospect.inspectorDetail.executionEndTime}</Descriptions.Item>
				</Descriptions>
				<Descriptions size={'default'} column={1} className="descriptions-basic">
					<Descriptions.Item label="检验人">
						{/* {
							retrospect.inspectorDetail.inspectorList.map((item, index) => {
								return (
									<span className="inspector" key={index}> {item.inspectorName}</span>
								)
							})
						} */}
					</Descriptions.Item>
				</Descriptions>
				<Descriptions size={'default'} column={2} className="descriptions-basic">
					<Descriptions.Item label="检验数量：">{retrospect.inspectorDetail.QuantityNumber}</Descriptions.Item>
					<Descriptions.Item label="合格数量：">{retrospect.inspectorDetail.QualifiedNumber}</Descriptions.Item>
				</Descriptions>
				<Descriptions size={'default'} column={1} className="descriptions-basic">
					<Descriptions.Item label="质检详情"></Descriptions.Item>
				</Descriptions>
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
