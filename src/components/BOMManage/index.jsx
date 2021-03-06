import { useState } from 'react'
import materialsManageContainer from '../../container/materialsManage'
import { SearchBanner } from '../../components/searchContentOr/index'
import { Table, Button, Space, Modal, message } from 'antd'
import { DiffOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import history from '../../history'
import './index.less'

export const BOMListPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [materialDetail, setDetail] = useState({
    materialName: '',
    type: '',
    Unit: '',
    supplier: '',
    brand: '',
    imgUrl: ''
  })

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
      imgUrl: text.imgUrl
    })
  }
  const modify = (text) => {
    if(text.BomID !== '') {
      navigate('/bomModify',{state:{BomID: text.BomID, imgUrl: text.imgUrl}})
    } else {
      message.warning('该条目无id值不能修改');
    }
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const columns = [
    {
      align: 'center',
      title: '产成品',
      dataIndex: 'FinishSkuCode',
      key: 'FinishSkuCode',
    },
    {
      align: 'center',
      title: 'BOM名称',
      dataIndex: 'BomName',
      key: 'BomName',
    },
    {
      align: 'center',
      title: '出成率',
      dataIndex: 'Rate',
      key: 'Rate'
    },
    {
      align: 'center',
      title: '构成原料',
      dataIndex: 'Material',
      key: 'Material',
    },
    {
      align: 'center',
      title: '构成原料数量',
      dataIndex: 'Quantity',
      key: 'Quantity'
    },
    {
      align: 'center',
      title: '详情',
      key: 'action',
      render: (text, record) => (
          text.imgUrl ?
                <Space size="middle">
                  <Button className="common-btn-bg" onClick={() => modify(text)}>修改</Button>
                  <Button className="common-btn-bg" onClick={() => detail(text)}>图片</Button>
                </Space> : null

      ),
    },
  ]
  return (
    <div className="container">
      <div className="search-container flex" style={{margin: 0}}>
        <SearchBanner placeHolder="产成品 | BOM名称" initialData={materialList.initialBoms} setData={materialList.setBoms} searchKeys={['FinishSkuCode', 'BomName']} />
        <Button icon={<DiffOutlined/>} className="common-add-btn" onClick={() => navigate('/bomCreate')}>创建</Button>
      </div>

      <div className="common-long-table">
        <Table columns={columns} dataSource={materialList.boms} />
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
          {/*<p><span>物料名称</span>{materialDetail.materialName}</p>*/}
          {/*<p><span>类型</span>{materialDetail.type}</p>*/}
          {/*<p><span>规格</span>{materialDetail.Unit}</p>*/}
          {/*<p><span>供货商</span>{materialDetail.supplier}</p>*/}
          {/*<p><span>品牌</span>{materialDetail.brand}</p>*/}
          <div>
            <p><span>原料照片</span></p>
            <img className="img" src={materialDetail.imgUrl} alt="" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
