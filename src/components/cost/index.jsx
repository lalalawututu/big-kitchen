import costContainer from '../../container/cost'
import CollapseHeader from './components/collapseHeader'
import CollapseGross from './components/collapseGross'
import { Table, Collapse } from 'antd';
import './index.less'
const { Panel } = Collapse;

const Header = () => {
  return (
    <header>
      <div className='title'>成本核算</div>
    </header>
  )
}

const CostContent = () => {
  let costMange = costContainer.useContainer();
  var grossProfitData = costMange.grossProfitData; //毛利率数据
  var data = costMange.data;

  const ColumnsData = {
    laborColumns: [
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
    ],
    materialColumns: [
      {
        align: 'center',
        title: '物料名称',
        dataIndex: 'sku_code',
        key: 'sku_code',
      },
      {
        align: 'center',
        title: '消耗数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        align: 'center',
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      }
    ],
    deviceColumns: [
      {
        align: 'center',
        title: '设备名称',
        dataIndex: 'device',
        key: 'device',
      },
      {
        align: 'center',
        title: '运行时间',
        dataIndex: 'hours',
        key: 'hours',
      },
      {
        align: 'center',
        title: '是否故障',
        dataIndex: 'fault',
        key: 'fault',
      }
    ],
    energyColumns: [
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
  }

  const energyCostData = [
    {}
  ]
  console.log(costMange, 'StockIndex')
  console.log(data, 'data')
  const genExtra = (item) => (
    <CollapseHeader data={item} index={index} onClick={(WarehouseId, tabName) => this.getTabData(WarehouseId, tabName)} />
  )

  return (
    <>
      {/* 毛利率 */}
      <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right'>
        <Panel header={grossProfitData.costName} key="1">
          <CollapseGross data={grossProfitData} />
        </Panel>
      </Collapse>
      {
        data && data.map((item, index) => {
          return (
            <div key={item.costId}>
              <Collapse defaultActiveKey={['1']} ghost expandIconPosition='right'>
                {/* <Panel header={item.costName} extra={genExtra(`${JSON.stringify(item)}`)} key="1"> */}
                <Panel header={item.costName} key="1">
                  <CollapseHeader data={item} index={index} onClick={(WarehouseId, tabName) => this.getTabData(WarehouseId, tabName)} />
                  {/* <div className='table_new'>
                                <Table style={{ display: index === StockIndex.optKey ? 'block' : 'none' }} columns={StockIndex.tableColumns} dataSource={StockIndex.tableData} rowKey={record => record.Id} pagination={false} bordered size="small" />
                            </div> */}
                  <div className='table_newCost table_newOpen'>
                    <Table columns={ColumnsData[item.Columns]} dataSource={energyCostData} rowKey={record => record.Id} pagination={false} bordered size="small" />
                  </div>
                </Panel>
              </Collapse>
            </div>
          )
        })
      }

    </>

  )
}

const CostPage = () => {
  let costMange = costContainer.useContainer();
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
      title: '消耗数量',
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
      title: '运行时间',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      align: 'center',
      title: '是否故障',
      dataIndex: 'fault',
      key: 'fault',
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
  console.log(costMange)
  return (
    <div >
      <div className="common-long-table">
        <h1 className="common-title">物料成本</h1>
        <Table columns={materialColumns} dataSource={costMange.materialCostData} />
      </div>
      <div className="common-long-table">
        <h1 className="common-title">员工成本</h1>
        <Table columns={laborColumns} dataSource={costMange.laborCostData} />
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

export default function index() {
  return (
    <div className='cost-content container'>
      <Header />
      <CostContent />
      {/* <CostPage /> */}
    </div>
  )
}
