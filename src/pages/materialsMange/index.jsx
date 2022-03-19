import { useState } from 'react'
import materialsMangeContainer from '../../container/materialsMange'
import { Table, Button, Space, Modal } from 'antd'
import { SearchBanner } from '../../component/materialsearchbanner/index.tsx'
import './index.less'

export const MaterialsListPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [materialDetail, setDetail] = useState({
    materialName: '',
    type: '',
    Unit: '',
    supplier: '',
    brand: '',
    imgurl: ''
  })
  let materialList = materialsMangeContainer.useContainer()
  const detail = (text) => {
    setIsModalVisible(true)
    setDetail({
      ...materialDetail,
      materialName: text.materialName,
      type: text.type,
      Unit: text.Unit,
      supplier: text.supplier,
      brand: text.brand,
      imgurl: text.imgurl
    })
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const columns = [
    {
      align: 'center',
      title: '原料名称',
      dataIndex: 'materialName',
      key: 'materialName',
    },
    {
      align: 'center',
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      align: 'center',
      title: '规格',
      dataIndex: 'Unit',
      key: 'Unit',
    },
    {
      align: 'center',
      title: '供货商',
      dataIndex: 'supplier',
      key: 'supplier'
    },
    {
      align: 'center',
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      align: 'center',
      title: '详情',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button className="common-btn-bg" onClick={() => detail(text)}>查看</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <SearchBanner initialData={materialList.initialData} setData={materialList.setData} />
      <div className="common-long-table">
        <Table columns={columns} dataSource={materialList.data} />
      </div>
      <Modal title="物料详情"
        width={600}
        centered
        visible={isModalVisible}
        okText="确定"
        className="add-mask"
        footer={[]}
        onCancel={handleOk}>
        <div className="tags-type-box">
          <span>物料名称:{materialDetail.materialName}</span>
          <span>类型:{materialDetail.type}</span>
          <span>规格:{materialDetail.Unit}</span>
          <span>供货商:{materialDetail.supplier}</span>
          <span>品牌:{materialDetail.brand}</span>
          <div>原料照片<img src={materialDetail.imgurl} alt="" /></div>
        </div>
      </Modal>
    </div>
  )
}