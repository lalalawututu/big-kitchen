import { Table, Space, Button } from 'antd'
import perfContainer from "../../container/performance";

export const GroupAttendancePage = () => {
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
      title: '是否出勤',
      dataIndex: 'attendance',
      key: 'attendance',
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
          <h1 className="common-title">小组出勤率</h1>
          <Table columns={Columns} dataSource={perfManage.laborCostData} />
        </div>
      </div>
  )
}
