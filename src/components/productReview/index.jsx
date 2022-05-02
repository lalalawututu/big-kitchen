import { Table, Button, Input, Space, Modal, Descriptions, Select, DatePicker } from 'antd';
import ProductReviewContainer from "@/container/productReview";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

//搜索
function SearchFun() {
  return (
    <div className='KillOpt'>
      <div className='flex marginRight'>
        <div className='title'>搜索:</div>
        <Input className='field-input' placeholder="请输入关键字" />
      </div>

      <div className='flex marginRight'>
        <div className='title'>时间范围:</div>
        <RangePicker className='field-date' format={dateFormat} />
      </div>

      <div className='flex marginRight'>
        <div className='title'>消杀楼层:</div>
        <Select
          placeholder="请选择"
          allowClear
          className='field-select'
          dropdownClassName='field-select-dropdown'
          dropdownMatchSelectWidth={false}
        >
          <Option value="全部">全部</Option>
          <Option value="一层">一层</Option>
          <Option value="二层">二层</Option>
          <Option value="三层">三层</Option>
        </Select>
      </div>

      <Button type="primary" className='searchBtn'>查询</Button>
    </div>
  )
}

//表格
function TableFun() {
  const navigate = useNavigate();
  let productReview = ProductReviewContainer.useContainer();

  const columns = [
    { title: '序号', align: 'center', width: 80, render: (text, record, index) => `${index + 1}` },
    { title: '批次号', dataIndex: 'BatchNumber', key: 'BatchNumber', ellipsis: true, align: 'center' },
    { title: '订单号', dataIndex: 'OrderNumber', key: 'OrderNumber', ellipsis: true, align: 'center' },
    { title: '供应商', dataIndex: 'supplier', key: 'supplier', ellipsis: true, align: 'center' },
    { title: '入库时间', dataIndex: 'WarehousingTime', key: 'WarehousingTime', ellipsis: true, align: 'center' },
    { title: '客户', dataIndex: 'customer', key: 'customer', ellipsis: true, align: 'center' },
    { title: '子批次', dataIndex: 'Subbatch', key: 'Subbatch', ellipsis: true, align: 'center' },
    {
      title: '操作', key: 'option', align: 'center', width: 120,
      render: (text, record) => (
        <Space size="middle">
          <Button className="common-btn-bg" onClick={() => navigate('/ProductReviewDetail')}>查看</Button>
        </Space>
      )
    },
  ]

  return (
    <div className='common-long-table'>
      <Table
        rowKey={record => record.BatchNumber}
        columns={columns}
        dataSource={productReview.data}
      />
    </div >
  )
}

export default function index() {
  return (
    <div className='OzoneKill  container'>
      <ProductReviewContainer.Provider>
        <SearchFun />
        <TableFun />
      </ProductReviewContainer.Provider>
    </div >
  )
}
