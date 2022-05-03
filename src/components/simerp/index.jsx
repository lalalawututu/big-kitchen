import ThirdPartyMangeContainer from '../../container/thirdpartymange'
import { Layout, Button, Table } from 'antd'
import './index.less'

const { Content } = Layout
const columns = [
  {
    title: '订单号',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: '客户名称',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: '客户地址',
    dataIndex: 'client_address',
    key: 'client_address',
  },
  {
    title: 'SKU',
    dataIndex: 'SKU',
    key: 'SKU',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '菜品',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '交货时间',
    dataIndex: 'date',
    key: 'date',
  },
];

const purchaseColumns = [
  {
    title: '下单日前',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '物料',
    dataIndex: 'sku_code',
    key: 'sku_code',
  },
  {
    title: '数量',
    dataIndex: 'amount',
    key: 'amount',
  },
];
const customersColumns = [
  {
    title: '客户名称',
    dataIndex: 'company_name',
    key: 'company_name',
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    key: 'project_name',
  },
  {
    title: '档口名称',
    dataIndex: 'dk_name',
    key: 'dk_name',
  },
  {
    title: '地址',
    dataIndex: 'project_address',
    key: 'project_address',
  },
  {
    title: '联系人',
    dataIndex: 'project_contact',
    key: 'project_contact',
  },
  {
    title: '联系电话',
    dataIndex: 'project_phone',
    key: 'project_phone',
  },
  {
    title: '档口联系人',
    dataIndex: 'dk_contact',
    key: 'dk_contact',
  },
  {
    title: '档口联系电话',
    dataIndex: 'dk_phone',
    key: 'dk_phone',
  }
];

const suppliersColumns = [
  {
    title: '名称',
    dataIndex: 'supplier_name',
    key: 'supplier_name',
  },
  {
    title: '品牌',
    dataIndex: 'brand_name',
    key: 'brand_name',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '联系人',
    dataIndex: 'linkman',
    key: 'linkman',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '座机',
    dataIndex: 'landline',
    key: 'landline',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  }
];

export const SimErp = () => {
  let manager = ThirdPartyMangeContainer.useContainer();
  let margin_left = 0

  return (
    <div className="container">
      <Layout className="menu-list menu-lists">
        {
          manager.customer ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="common-long-table">
                    <div className="flex-between">
                      <h3 className="content-title">客户签约</h3>
                      <div className="time-import">
                        同步时间：<span>--:--</span>
                        <Button onClick={manager.importOrders} className="common-btn-bg import-btn">导入</Button>
                      </div>
                    </div>
                    <Table bordered dataSource={manager.customerData} columns={customersColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
        {
          manager.supplier ?
              <Layout className="site-layout" style={{ marginLeft: margin_left }}>
                <Content className="sider-content">
                  <div className="common-long-table">
                    <div className="flex-between">
                      <h3 className="content-title">供应商入住</h3>
                    </div>
                    <Table bordered dataSource={manager.supplierData} columns={suppliersColumns} />
                  </div>
                </Content>
              </Layout> : null
        }
        {
          manager.purchase ?
            <Layout className="site-layout" style={{ marginLeft: margin_left }}>
              <Content className="sider-content">
                <div className="common-long-table">
                  <div className="flex-between">
                    <h3 className="content-title">采购单</h3>
                    <div className="time-import">
                      <Button onClick={manager.sendPrice} className="common-btn-bg import-btn">报价</Button>
                    </div>
                  </div>
                  <Table bordered dataSource={manager.purchaseData} columns={purchaseColumns} />
                </div>
              </Content>
            </Layout> : null
        }
        {
          manager.orders ?
            <Layout className="site-layout" style={{ marginLeft: margin_left }}>
              <Content className="sider-content">
                <div className="common-long-table">
                  <div className="flex-between">
                    <h3 className="content-title">销售订单</h3>
                  </div>
                  <Table bordered dataSource={manager.ordersData} columns={columns} />
                </div>
              </Content>
            </Layout> : null
        }
      </Layout>
    </div>
  )
}
