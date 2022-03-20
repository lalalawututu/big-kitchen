import costContainer from '../../container/cost'
import { Table, Space } from 'antd'
import './index.less'

export const CostPage = () => {
  let costMange = costContainer.useContainer()
  const laborColumns = [
    {
      align: 'center',
      title: '员工姓名',
      dataIndex: 'employee',
      key: 'employee',
    },
    {
      align: 'center',
      title: '工时',
      dataIndex: 'hour',
      key: 'hour',
    },
    {
      align: 'center',
      title: '薪资',
      dataIndex: 'price',
      key: 'price',
    }
  ]
  const materialColumns = [
    {
      align: 'center',
      title: '物料名称',
      dataIndex: 'sku_code',
      key: 'sku_code',
    },
    {
      align: 'center',
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      align: 'center',
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    }
  ]
  const deviceColumns = [
    {
      align: 'center',
      title: '设备名称',
      dataIndex: 'device',
      key: 'device',
    },
    {
      align: 'center',
      title: '购买价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      align: 'center',
      title: '折旧率',
      dataIndex: 'down_rate',
      key: 'down_rate',
    }
  ]
  const energyColumns = [
    {
      align: 'center',
      title: '能源种类',
      dataIndex: 'energy_type',
      key: 'energy_type',
    },
    {
      align: 'center',
      title: '总价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      align: 'center',
      title: '消耗数量',
      dataIndex: 'amount',
      key: 'amount',
    }
  ]
  return (
    <div className="container">
      <div className="common-long-table">
        <h1 className="common-title">员工成本</h1>
        <Table columns={laborColumns} dataSource={costMange.laborCostData} />
      </div>
      <div className="common-long-table">
        <h1 className="common-title">物料成本</h1>
        <Table columns={materialColumns} dataSource={costMange.materialCostData} />
      </div>
      <div className="common-long-table">
        <h1 className="common-title">设备成本</h1>
        <Table columns={deviceColumns} dataSource={costMange.deviceCostData} />
      </div>
      <div className="common-long-table">
        <h1 className="common-title">能源成本</h1>
        <Table columns={energyColumns} dataSource={costMange.energyCostData} />
      </div>
    </div>
  )
}
