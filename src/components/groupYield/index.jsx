import { Table, Space, Button } from 'antd'
import './index.less'

export const GroupYieldPage = () => {
  const Columns = [
    {
      align: 'center',
      title: '小组',
      dataIndex: 'group',
      key: 'group',
    },
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
  const data = [
    {
      "group": "质检一组",
      "employee": "张三｜李四｜王武",
      "Yield": "54",
    },
    {
      "group": "质检二组",
      "employee": "刘三｜李四｜王武",
      "Yield": "30",
    },
    {
      "group": "质检三组",
      "employee": "马三｜李四｜王武",
      "Yield": "54",
    },
  ]
  return (
    <div className="container">
      <div className="common-long-table">
        <h1 className="common-title">小组总产出</h1>
        <Table columns={Columns} dataSource={data} />
      </div>
    </div>
  )
}
