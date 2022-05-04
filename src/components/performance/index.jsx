import {Table, Space, Button, Tag, DatePicker} from 'antd'
import perfContainer from "../../container/performance";
import {SearchBanner} from "../searchbanner";

//搜索
function SearchFun() {
  return (
      <div className='tags-wrap' style={{'marginBottom': '.34rem'}}>
        <div className='title'>按天查询</div>
        <div className='flex'>
          <Tag className='active'>今天</Tag>
          <Tag className=''>昨天</Tag>
          <DatePicker className='field-date' />
          <Button type="primary" className='btn'>确定</Button>
        </div>
      </div>
  )
}

export const PerformancePage = () => {
  let perfManage = perfContainer.useContainer()
  const Columns = [
    {
      align: 'center',
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: '部门',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: '工种',
      dataIndex: 'type',
      key: 'type',
    },
    {
      align: 'center',
      title: '当前在岗',
      dataIndex: 'duty',
      key: 'duty',
    },
    {
      align: 'center',
      title: '总工时',
      dataIndex: 'hour',
      key: 'hour',
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
      <div className="distribution container frmLoss">
        <SearchBanner initialData={perfManage.initialData} setData={perfManage.setData} />
        <SearchFun />
        <div className="tableList_new">
          {/*<h1 className="common-title">小组总工时</h1>*/}
          <Table columns={Columns} dataSource={perfManage.laborCostData} />
        </div>
      </div>
  )
}
