import ProdutionListContainer from '../../container/productionlist'
import { Table, Button, Space } from 'antd'
import history from '../../history';
import './index.less'

export const ProductionListPage = () => {
  let planList = ProdutionListContainer.useContainer()
  const checkState = (text) => {
    history.push(`/productioncheck/?ProductCode=${text.ProductCode}`);
  }
  const detailState = (text) => {
    history.push(`/productiondetail/?ProductCode=${text.ProductCode}`);
  }
  const columns = [
    {
      align: 'center',
      title: '计划名称',
      dataIndex: 'PlanName',
      key: 'PlanName',
    },
    {
      align: 'center',
      title: '计划开始时间',
      dataIndex: 'PlanStartTime',
      key: 'PlanStartTime',
    },
    {
      align: 'center',
      title: '计划完成时间',
      dataIndex: 'PlanEndTime',
      key: 'PlanEndTime',
    },
    {
      align: 'center',
      title: '任务数量',
      dataIndex: 'TaskNumber',
      key: 'TaskNumber'
    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'CheckStatusName',
      key: 'CheckStatusName'
    },
    {
      align: 'center',
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button className="common-btn-bg" onClick={() => checkState(text)}>审核</Button>
          <Button className="common-btn-bg">撤回</Button>
          <Button className="common-btn-bg" onClick={() => detailState(text)}>查看</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div className="common-long-table">
        <Table columns={columns} dataSource={planList.data}/>
      </div>
    </div>
  )
}