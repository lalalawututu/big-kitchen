import workMangeContainer from '../../container/workmange'
import { Table, Button, Space } from 'antd'
import { SearchBanner } from '../../component/searchbanner/index.tsx'
import history from '../../history'
import './index.less'

export const WorkMangePage = () => {
  let mange = workMangeContainer.useContainer()
  const workInfo = (text) => {
    history.push(`/workinformation/?workmanshipId=${text.WorkmanshipId}`);
  }
  const columns = [
    {
      align: 'center',
      dataIndex: 'WorkmanshipName',
      key: 'WorkmanshipName',
      render: text => <span>工艺名称：<strong>{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'FinishedProduct',
      key: 'FinishedProduct',
      render: text => <span>产成品：<strong>{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'ProductionLineName',
      key: 'ProductionLineName',
      render: text => <span>对应生产线：<strong>{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'workerNumber',
      key: 'workerNumber',
      render: text => <span>工人数量：<strong className="cyan">{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'WorkerQuantity',
      key: 'WorkerQuantity',
      render: text => <span>工序数量：<strong className="purple">{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'WorkingHours',
      key: 'WorkingHours',
      render: text => <span>工艺总用时：<strong className="red">{text}</strong></span>,
    },
    {
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button className="common-btn-bg" onClick={() => workInfo(text)}>查看</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <SearchBanner initialData={mange.initialData} setData={mange.setData} />
      <div className="table-no-header">
        <Table columns={columns} dataSource={mange.data} />
      </div>
    </div>
  )
}