import { useState } from 'react'
import materialsManageContainer from '../../container/materialsManage'
import { SearchBanner } from '../../pages/materialsearchbanner/index.tsx'
import { Table, Button, Space, Modal, Tag, Divider } from 'antd'
import { DiffOutlined } from '@ant-design/icons'
import history from '../../history'
import './index.less'

const { CheckableTag } = Tag;
const tagsData = ['全部', '产成品', '原料', '调料', '包材', '耗材', '备件/配件', '其他'];

export const MaterialsListPage = () => {
  const [selectedTags, setSelectedTags] = useState(['全部'])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [materialDetail, setDetail] = useState({
    materialName: '',
    type: '',
    Unit: '',
    supplier: '',
    brand: '',
    imgurl: ''
  })
  const create = () => {
    history.push(`/materialscreate`);
  }
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags)
  }
  let materialList = materialsManageContainer.useContainer()
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
  ]
  return (
    <div className="container bom-container">
      <div className="search-container flex" style={{ margin: 0 }}>
        <SearchBanner initialData={materialList.initialData} setData={materialList.setData} />
        <Button icon={<DiffOutlined />} className="common-add-btn" onClick={() => create()}>创建</Button>
      </div>
      <div className="tags-type-box tags-color">
        <h5 className="label">类型：</h5>
        {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
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
        <div className="detail-list">
          <p><span>物料名称</span>{materialDetail.materialName}</p>
          <p><span>类型</span>{materialDetail.type}</p>
          <p><span>规格</span>{materialDetail.Unit}</p>
          <p><span>供货商</span>{materialDetail.supplier}</p>
          <p><span>品牌</span>{materialDetail.brand}</p>
          <div>
            <p><span>原料照片</span></p>
            <img className="img" src={materialDetail.imgurl} alt="" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
