import { Table, Space, Button } from 'antd'

export const GroupAttendancePage = () => {
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
      title: '平均出勤率',
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
  const data = [
    {
      "group": "质检一组",
      "employee": "张三｜李四｜王武",
      "attendance": "87%",
    },
    {
      "group": "质检二组",
      "employee": "刘三｜李四｜王武",
      "attendance": "70%",
    },
    {
      "group": "质检三组",
      "employee": "马三｜李四｜王武",
      "attendance": "89%",
    },
  ]
  return (
    <div className="container">
      <div className="common-long-table">
        <h1 className="common-title">小组出勤率</h1>
        <Table columns={Columns} dataSource={data} />
      </div>
    </div>
  )
}
