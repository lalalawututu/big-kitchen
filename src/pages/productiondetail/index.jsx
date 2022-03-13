import { useState } from 'react'
import ProdutionDetailContainer from '../../container/productiondetail'
import { Table, Button, Space } from 'antd'
import './index.less'

export const ProductionDetailPage = () => {

  let detail = ProdutionDetailContainer.useContainer()
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
          <Button className="common-btn-bg">查看</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div className="common-long-table">
        <Table columns={columns} dataSource={detail.data} />
      </div>
    </div>
  )
}