import { Table, Input,Tag,DatePicker,Button } from 'antd';
import FrmLoss from '../../container/frmLoss';
import './index.less'
const { Search } = Input;

//搜索
function SearchFun() {
  return (
    <div>
      <div className='tags-wrap'>
        <div className='title'>按天查询</div>
        <div className='flex'>
          <Tag className='active'>今天</Tag>
          <Tag className=''>昨天</Tag>
          <DatePicker className='field-date' />
          <Button type="primary" className='btn'>确定</Button>
        </div>
      </div>
    </div>
  )
}

//表格
function TableFun() {
  let frmLoss = FrmLoss.useContainer();
  const columns = [
    { title: '订单号', dataIndex: 'lossCode', key: 'lossCode', ellipsis: true, align: 'center' },
    { title: '客户', dataIndex: 'customer', key: 'customer', ellipsis: true, align: 'center' },
    { title: '菜品', dataIndex: 'food', key: 'food', ellipsis: true, align: 'center' },
    { title: '数量', dataIndex: 'number', key: 'number', ellipsis: true, align: 'center' },
    { title: '报损原因', dataIndex: 'lossReason', key: 'lossReason', ellipsis: true, align: 'center' },
  ]
  return (
    <div className='tableList_new'>
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={frmLoss.data}
      />
    </div>
  )
}

export default function frmLoss() {
  return (
    <div className='distribution container frmLoss'>
      <SearchFun />
      <TableFun />
    </div >
  )
}
