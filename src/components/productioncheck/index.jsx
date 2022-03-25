import { useState } from 'react'
import ProdutionTrialListContainer from '../../container/productioncheck'
import { Table, Button, Space, Input, Modal } from 'antd'

export const ProductionTrialListPage = () => {
  const [peopleName, setPeopleName] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  let trialList = ProdutionTrialListContainer.useContainer()
  const modifyPeople = (text) => {
    setIsModalVisible(true)
    trialList.setTaskId(text.TaskId)
  }
  const changeName = (event) => {
    setPeopleName(event.target.value)
  }
  const handleOk = () => {
    trialList.setPeopleName(peopleName)
    setPeopleName('')
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setPeopleName('')
    trialList.setTaskId('')
    setIsModalVisible(false)
  }
  const columns = [
    {
      align: 'center',
      title: '任务编号',
      dataIndex: 'TaskId',
      key: 'TaskId',
    },
    {
      align: 'center',
      title: '任务名称',
      dataIndex: 'WorkingProcedureName',
      key: 'WorkingProcedureName',
    },
    {
      align: 'center',
      title: '生产类型',
      dataIndex: 'TaskType',
      key: 'TaskType',
    },
    {
      align: 'center',
      title: '工单内容',
      dataIndex: 'TaskContent',
      key: 'TaskContent'
    },
    {
      align: 'center',
      title: '任务计划开始时间',
      dataIndex: 'PlanStartTime',
      key: 'PlanStartTime'
    },
    {
      align: 'center',
      title: '任务计划完成时间',
      dataIndex: 'PlanEndTime',
      key: 'PlanEndTime'
    },
    {
      align: 'center',
      title: '执行人',
      dataIndex: 'EmployeeName',
      key: 'EmployeeName'
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button className="common-btn-bg" onClick={() => modifyPeople(text)}>修改执行人</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div className="common-long-table">
        <Table columns={columns} dataSource={trialList.data} />
      </div>
      <Modal title="修改执行人"
        width={600}
        centered
        visible={isModalVisible}
        okText="确定"
        cancelText="取消"
        className="add-mask"
        onOk={handleOk} onCancel={handleCancel}>
        <div className="tags-type-box">
          <Input size="large" placeholder="请输入新的执行人姓名" onChange={(event) => changeName(event)}/>
        </div>
      </Modal>
    </div>
  )
}