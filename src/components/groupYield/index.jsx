import { Table, Space, Button } from 'antd'
import perfContainer from "../../container/performance";

export const GroupYieldPage = () => {
  let perfManage = perfContainer.useContainer()
  const Columns = [
    {
      align: 'center',
      title: '成员',
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      align: 'center',
      title: '总产出',
      dataIndex: 'Yield',
      key: 'Yield',
    },
    {
      align: 'center',
      title: '详情',
      key: 'action',
      render: (text, record) => (
          <Space size="middle">
            <Button className="common-btn-bg">查看</Button>
          </Space>
      )
    }
  ]
  return (
      <div className="container">
        <div className="common-long-table">
          <h1 className="common-title">产出汇总</h1>
          <Table columns={Columns} dataSource={perfManage.laborCostData} />
        </div>
      </div>
  )
}
