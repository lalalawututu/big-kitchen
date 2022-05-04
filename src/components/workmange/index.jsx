import workMangeContainer from '../../container/workmange'
import { Table, Button, Space, Breadcrumb } from 'antd'
import './index.less'
import { SearchBanner } from "../searchbanner";

//去添加工艺页面
const workInfo = () => {
  window.location = `/#/workcreate`
}

const CrumbList = () => {
  return (
    <div className='crumbHeader'>
      <Breadcrumb separator="<">
        <Breadcrumb.Item>基础信息维护</Breadcrumb.Item>
        <Breadcrumb.Item style={{ 'color': '#333951' }}>工艺管理（适用于生产线）</Breadcrumb.Item>
      </Breadcrumb>
      <div className='optBtn' onClick={() => workInfo()}>
        <div className='title'>添加工艺</div>
        <img src={require('../../style/img/icon/icon-craftAdd.png')} alt="" />
      </div>
    </div>
  )
}

export const WorkMangePage = () => {
  let manage = workMangeContainer.useContainer()
  const workInfo = (text) => {
    window.location = `/#/workinformation/?id=${text.WorkmanshipId}`
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
      dataIndex: 'WorkmanshipContent',
      key: 'WorkmanshipContent',
      render: text => <span>工艺描述：<strong>{text}</strong></span>,
    },
    {
      align: 'center',
      dataIndex: 'ProcedureQuantity',
      key: 'ProcedureQuantity',
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
      <CrumbList />
      <SearchBanner initialData={manage.initialData} setData={manage.setData} />
      <div className="table-no-header">
        <Table columns={columns} dataSource={manage.data} />
      </div>
    </div>
  )
}
